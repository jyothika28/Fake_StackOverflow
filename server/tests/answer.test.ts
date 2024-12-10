import supertest from 'supertest';
import mongoose from 'mongoose';
import { Server } from 'http';
import Answer from "../models/answers";
import Questions from "../models/questions";

jest.mock('../models/application', () => ({
    saveAnswer: jest.fn(),
    addAnswerToQuestion: jest.fn(),
    findById: jest.fn()
}));

jest.mock("../models/questions", () => ({
    findById: jest.fn(),
}));


jest.mock("../models/answers", () => ({
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn()
}));

let server: Server;


describe("POST /flagAnswer/:aid", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        jest.clearAllMocks();
        server.close();
        await mongoose.disconnect();
    });

    it("should return 404 if the answer does not exist", async () => {
        (Answer.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

        const response = await supertest(server)
            .post("/answer/flagAnswer/nonexistentAnswerId")
            .send({ questionId: "mockQuestionId" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Answer not found" });
    });

    it("should return 500 if there is a database error", async () => {
        (Answer.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Database error");
        });

        const response = await supertest(server)
            .post("/answer/flagAnswer/mockAnswerId")
            .send({ questionId: "mockQuestionId" });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error flagging answer");
    });

    it("should return 500 if there is a database error", async () => {
        // Mock findByIdAndUpdate to throw an error
        (Answer.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Database error");
        });

        // Making the request
        const response = await supertest(server)
            .post("/answer/flagAnswer/dummyAnswerId");

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Error flagging answer" });
    });

    it("should successfully flag an answer and update the question", async () => {
        const mockAnswer = { _id: "mockAnswerId", flagged: true, save: jest.fn() };
        const mockQuestion = {
            _id: "mockQuestionId",
            answers: [{ _id: "mockAnswerId", flagged: false }],
            save: jest.fn().mockResolvedValue(true),
        };

        (Answer.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockAnswer);
        (Questions.findById as jest.Mock).mockResolvedValueOnce(mockQuestion);

        const response = await supertest(server)
            .post("/answer/flagAnswer/mockAnswerId")
            .send({ questionId: "mockQuestionId" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("This answer has been flagged for review.");
        expect(response.body.flaggedAnswer).toEqual({
            _id: "mockAnswerId",
            flagged: true,
        });
        expect(mockQuestion.answers[0].flagged).toBe(true);
    });


    it("should return 404 if the question does not exist", async () => {
        const mockAnswer = { _id: "mockAnswerId", flagged: true, save: jest.fn() };

        // Mock the required methods
        (Answer.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockAnswer);
        (Questions.findById as jest.Mock).mockResolvedValueOnce(null);

        const response = await supertest(server)
            .post("/answer/flagAnswer/mockAnswerId")
            .send({ questionId: "nonexistentQuestionId" });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Question not found");
    });

    it("should handle unexpected errors during flagging", async () => {
        // Mock `findByIdAndUpdate` to return a valid flagged answer
        const mockAnswer = { _id: "mockAnswerId", flagged: true, save: jest.fn() };
        (Answer.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockAnswer);

        // Mock `Questions.findById` to throw an unexpected error
        (Questions.findById as jest.Mock).mockImplementationOnce(() => {
            throw "Unexpected error"; // Simulate a non-error object
        });

        // Make the request
        const response = await supertest(server)
            .post("/answer/flagAnswer/mockAnswerId")
            .send({ questionId: "mockQuestionId" });

        // Assert that the response status is 500
        expect(response.status).toBe(500);

        // Assert that the correct error message is returned
        expect(response.body.error).toBe("Error flagging answer");
    });

    it("should successfully upvote an answer", async () => {
        const mockAnswer = { _id: "mockAnswerId", votes: 5 };
        const mockQuestion = {
            _id: "mockQuestionId",
            answers: [mockAnswer],
            save: jest.fn().mockResolvedValue(true),
        };

        (Questions.findById as jest.Mock).mockResolvedValueOnce(mockQuestion);

        const response = await supertest(server)
            .post("/answer/mockAnswerId/vote")
            .send({ questionId: "mockQuestionId", vote: "upvote" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`Answer mockAnswerId upvoted successfully.`);
        expect(mockAnswer.votes).toBe(6);
    });


    it("should successfully downvote an answer", async () => {
        const mockAnswer = { _id: "mockAnswerId", votes: 5 };
        const mockQuestion = {
            _id: "mockQuestionId",
            answers: [mockAnswer],
            save: jest.fn().mockResolvedValue(true),
        };

        (Questions.findById as jest.Mock).mockResolvedValueOnce(mockQuestion);

        const response = await supertest(server)
            .post("/answer/mockAnswerId/vote")
            .send({ questionId: "mockQuestionId", vote: "downvote" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`Answer mockAnswerId downvoted successfully.`);
        expect(mockAnswer.votes).toBe(4);
    });


    it("should return 400 for invalid vote action", async () => {
        const response = await supertest(server)
            .post("/answer/mockAnswerId/vote")
            .send({ questionId: "mockQuestionId", vote: "invalidVote" });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid vote action");
    });

    it("should return 404 if the question is not found", async () => {
        (Questions.findById as jest.Mock).mockResolvedValueOnce(null);

        const response = await supertest(server)
            .post("/answer/mockAnswerId/vote")
            .send({ questionId: "nonexistentQuestionId", vote: "upvote" });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Question not found");
    });

    it("should return 404 if the answer is not found within the question", async () => {
        const mockQuestion = { _id: "mockQuestionId", answers: [], save: jest.fn() };

        (Questions.findById as jest.Mock).mockResolvedValueOnce(mockQuestion);

        const response = await supertest(server)
            .post("/answer/nonexistentAnswerId/vote")
            .send({ questionId: "mockQuestionId", vote: "upvote" });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Answer not found");
    });

    it("should return 500 if there is a database error", async () => {
        (Questions.findById as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Database error");
        });

        const response = await supertest(server)
            .post("/answer/mockAnswerId/vote")
            .send({ questionId: "mockQuestionId", vote: "upvote" });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error voting on answer");
    });

});