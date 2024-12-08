import supertest from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import Question from "../models/questions";
import Answer from "../models/answers";

jest.mock("../models/questions", () => ({
    findById: jest.fn(),
}));


let server: Server;

const tag1 = {
    _id: '507f191e810c19729de860ea',
    name: 'tag1'
};
const tag2 = {
    _id: '65e9a5c2b26199dbcc3e6dc8',
    name: 'tag2'
};

describe("POST /flagQuestion/:qid", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should flag the question and return a success message", async () => {

        // Mocked question document
        const mockQuestion = {
            _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
            title: 'New Question Title',
            text: 'New Question Text',
            tags: [tag1.name, tag2.name],
            asked_by: 'question3_user',
            ask_date_time: new Date('2024-06-06'),
            flagged: false,
            save: jest.fn(),
        };

        // Mock the `save` method to simulate the flagged update
        mockQuestion.save.mockImplementation(function (this: typeof mockQuestion) {
            this.flagged = true; // Simulate flagged update
            return Promise.resolve(this);
        });

        // Mock the `findById` call to return the mocked question
        (Question.findById as jest.Mock).mockImplementation((id) => {
            return mockQuestion; // or `null` based on test case
        });

        // Making the request
        const response = await supertest(server)
            .post(`/question/flagQuestion/${mockQuestion._id}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("This post has been flagged for review.");

        expect(response.body.flaggedQuestion.flagged).toBe(true);
    });

    it("should return 404 if the question is not found", async () => {

        // Mock `findById` to return null (simulate question not found)
        (Question.findById as jest.Mock).mockResolvedValue(null);

        // Make the POST request with a non-existent question ID
        const response = await supertest(server)
            .post(`/question/flagQuestion/abc`)
            .send();

        // Assert response
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Question not found");
    });


    it("should return 500 if an error occurs during flagging", async () => {

        // Mock `findById` to throw an error (simulate database issue)
        (Question.findById as jest.Mock).mockRejectedValue(new Error("Database error"));

        // Make the POST request
        const response = await supertest(server)
            .post(`/question/flagQuestion/65e9b58910afe6e94fc6e6fe`)
            .send();

        // Assert response
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error flagging question");
    });

    it("should flag a comment within a specific answer", async () => {
        const mockAnswer = {
            _id: "mockAnswerId",
            comments: [
                {
                    _id: "mockCommentId",
                    text: "Mock comment",
                    flagged: false,
                },
            ],
            save: jest.fn().mockResolvedValue(true),
        };

        jest.spyOn(Answer, "findById").mockResolvedValueOnce(mockAnswer);

        const response = await supertest(server)
            .post("/answer/mockAnswerId/comment/mockCommentId/flagComment");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Comment flagged for moderation");
        expect(mockAnswer.comments[0].flagged).toBe(true);
    });

});
