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
            comment_date_time: new Date(),
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

    it("should return 500 if there is an error adding a comment", async () => {
        const mockError = new Error("Database error");

        // Mock Answer.findById to throw an error
        (Answer.findById as jest.Mock).mockRejectedValueOnce(mockError);

        const response = await supertest(server)
            .post("/comment/answer/65e9b58910afe6e94fc6e6dc/comment")
            .send({
                text: "This is a test comment",
                commented_by: "dummyUserId",
            });

        // Assertions
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error adding comment");
        expect(console.error).toHaveBeenCalledWith(
            "Error adding comment:",
            mockError
        );
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

    it("should throttle requests when rate limit is exceeded", async () => {
        const requests = Array(10)
            .fill(null)
            .map(() =>
                supertest(server)
                    .post("/comment/answer/mockAnswerId/comment")
                    .send({
                        text: "Rapid comment",
                        commented_by: "testUser",
                    })
            );

        const responses = await Promise.all(requests);

        const rateLimitedResponses = responses.filter(
            (response) => response.status === 429
        );

        expect(rateLimitedResponses.length).toBeGreaterThan(0);
        expect(rateLimitedResponses[0].body.error).toBe(
            "Server is busy, please try again later."
        );
    });

    it("should flag a comment successfully", async () => {
        const mockAnswer = {
            _id: "mockAnswerId",
            comments: [
                { _id: "mockCommentId", flagged: false },
            ],
            save: jest.fn().mockResolvedValue(true),
        };

        (Answer.findById as jest.Mock).mockResolvedValueOnce(mockAnswer);

        const response = await supertest(server)
            .post("/comment/answer/mockAnswerId/comment/mockCommentId/flagComment");

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