import supertest from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import Answer from "../models/answers";

jest.mock("../models/answers", () => ({
    findById: jest.fn(),
}));

const mockAnswer = {
    _id: "65e9b58910afe6e94fc6e6dc",
    text: "This is a test answer",
    comments: [
        {
            _id: "mockCommentId",
            text: "This is a mock comment",
            commented_by: "mockUserId",
            comment_date_time: expect.any(Date),
            votes: 0,
        },
    ],
    save: jest.fn().mockResolvedValue(true),
};

const mockComment = {
    text: "This is a test comment",
    commented_by: "dummyUserId",
    comment_date_time: expect.any(Date),
    votes: 0,
};

const flagComment = {
    _id: "mockCommentId",
    text: "This is a mock comment",
    commented_by: "mockUserId",
    comment_date_time: expect.any(Date),
    votes: 0,
};


let server: Server;

describe("POST /comment/answer/:answerId/comment", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        jest.clearAllMocks();
        server.close();
        await mongoose.disconnect();
    });

    it("should add a comment to an existing answer", async () => {
        (Answer.findById as jest.Mock).mockResolvedValueOnce(mockAnswer);

        const response = await supertest(server)
            .post("/comment/answer/65e9b58910afe6e94fc6e6dc/comment")
            .send({
                text: mockComment.text,
                commented_by: mockComment.commented_by,
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Comment added successfully");

        console.log("response.body.comment", response.body.comment);
        console.log("mockComment", mockComment);
        console.log("mockComment.comment_date_time", mockComment.comment_date_time);

        expect(response.body.comment).toEqual(
            expect.objectContaining({
                ...mockComment,
                comment_date_time: expect.any(String), // Check that it's a serialized date string
            })
        );

        // Further validate the date format
        const commentDate = new Date(response.body.comment.comment_date_time);
        expect(commentDate.toISOString()).toBe(response.body.comment.comment_date_time);

    });

    it("should return 400 if the comment body is invalid", async () => {
        const response = await supertest(server)
            .post("/comment/answer/dummyAnswerId/comment")
            .send({ text: "" }); // Missing `commented_by`

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid comment body");
    });

    it("should return 404 if the answer does not exist", async () => {
        (Answer.findById as jest.Mock).mockResolvedValueOnce(null);

        const response = await supertest(server)
            .post("/comment/answer/nonExistentAnswerId/comment")
            .send({
                text: "This is a test comment",
                commented_by: "dummyUserId",
            });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Answer not found");
    });

    it("should return 500 if there is a server error", async () => {
        (Answer.findById as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Database error");
        });

        const response = await supertest(server)
            .post("/comment/answer/mockAnswerId/comment")
            .send({
                text: "This is a test comment",
                commented_by: "testUser",
            });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error adding comment");
    });

    it("should return 500 if there is a server error", async () => {
        // Mock Answer.findById to throw an error
        (Answer.findById as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Database error");
        });

        // Spy on console.error to verify it logs the error
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        // Make the request
        const response = await supertest(server)
            .post("/comment/answer/mockAnswerId/comment")
            .send({
                text: "This is a test comment",
                commented_by: "testUser",
            });

        // Assertions
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error adding comment");

        // Verify console.error was called with the correct error message
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error adding comment:"),
            expect.any(Error) // Match any Error object
        );

        // Restore the original console.error
        consoleErrorSpy.mockRestore();
    });

    it("should retrieve comments for a given answer", async () => {
        const mockComments = [
            { text: "First comment", commented_by: "user1", votes: 0 },
            { text: "Second comment", commented_by: "user2", votes: 1 },
        ];

        const mockAnswer = { _id: "mockAnswerId", comments: mockComments };
        (Answer.findById as jest.Mock).mockResolvedValueOnce(mockAnswer);

        const response = await supertest(server)
            .get("/comment/answer/mockAnswerId/comments");

        expect(response.status).toBe(200);
        expect(response.body.comments).toEqual(mockComments);
    });

    it("should flag a comment successfully", async () => {

        (Answer.findById as jest.Mock).mockResolvedValueOnce(mockAnswer);

        const response = await supertest(server)
            .post(`/comment/answer/${mockAnswer._id}/comment/${flagComment._id}/flagComment`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Comment flagged for moderation");
        expect(response.body.comment.flagged).toBe(true);
    });

    it("should return 404 if the comment does not exist", async () => {
        const mockAnswer = {
            _id: "mockAnswerId",
            comments: [],
        };

        (Answer.findById as jest.Mock).mockResolvedValueOnce(mockAnswer);

        const response = await supertest(server)
            .post("/comment/answer/mockAnswerId/comment/nonExistentCommentId/flagComment");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Comment not found");
    });
});

describe("GET /comment/answer/:answerId/comments", () => {
    let server: any;

    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        jest.clearAllMocks();
        server.close();
    });

    it("should return 404 if the answer is not found", async () => {
        // Mock findById to return null
        (Answer.findById as jest.Mock).mockResolvedValueOnce(null);

        const response = await supertest(server).get("/comment/answer/nonexistentAnswerId/comments");

        console.log("Response body:", response.body);

        // Validate the response
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Answer not found");
    });

    it("should return 500 if there is a server error while retrieving comments", async () => {
        // Mock Answer.findById to throw an error
        (Answer.findById as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Database error");
        });

        const response = await supertest(server)
            .get("/comment/answer/mockAnswerId/comments");

        // Assertions
        expect(response.status).toBe(500); // Ensure the status code is 500
        expect(response.body.error).toBe("Error retrieving comments"); // Ensure the error message is correct
    });

    it("should return 404 if the answer is not found when flagging a comment", async () => {
        // Mock Answer.findById to return null
        (Answer.findById as jest.Mock).mockResolvedValueOnce(null);

        const response = await supertest(server)
            .post("/comment/answer/nonexistentAnswerId/comment/mockCommentId/flagComment");

        // Assertions
        expect(response.status).toBe(404); // Ensure the status code is 404
        expect(response.body.error).toBe("Answer not found"); // Ensure the error message matches
    });

    it("should return 200 and the list of comments for the given answer", async () => {
        // Mock data for an answer with comments
        const mockAnswer = {
            _id: "existingAnswerId",
            comments: [
                {
                    _id: "mockCommentId1",
                    text: "This is the first comment",
                    commented_by: "user1",
                    comment_date_time: new Date(),
                    votes: 5,
                },
                {
                    _id: "mockCommentId2",
                    text: "This is the second comment",
                    commented_by: "user2",
                    comment_date_time: new Date(),
                    votes: 3,
                },
            ],
        };

        // Mock Answer.findById to return the mock answer
        (Answer.findById as jest.Mock).mockResolvedValueOnce(mockAnswer);

        // Make the request to the endpoint
        const response = await supertest(server).get("/comment/answer/existingAnswerId/comments");

        // Assertions
        expect(response.status).toBe(200); // Ensure status is 200
        expect(response.body.comments).toEqual(
            mockAnswer.comments.map((comment) => ({
                ...comment,
                comment_date_time: new Date(comment.comment_date_time).toISOString(),
            }))
        );
    });

    it("should return 404 if the comment is not found in the answer", async () => {
        const mockAnswer = {
            _id: "existingAnswerId",
            comments: [
                {
                    _id: "mockCommentId1",
                    text: "This is a comment",
                    commented_by: "user1",
                    comment_date_time: new Date().toISOString(),
                    votes: 3,
                },
            ],
            save: jest.fn(),
        };

        // Mock Answer.findById to return the mock answer
        (Answer.findById as jest.Mock).mockResolvedValue(mockAnswer);

        // Make the request to flag a nonexistent comment
        const response = await supertest(server)
            .post("/comment/answer/existingAnswerId/comment/nonexistentCommentId/flagComment");

        // Assertions
        expect(response.status).toBe(404); // Ensure 404 is returned
        expect(response.body.error).toBe("Comment not found"); // Ensure correct error message
    });

});