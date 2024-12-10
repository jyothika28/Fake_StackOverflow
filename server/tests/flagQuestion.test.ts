import supertest from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import Question from "../models/questions";

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
        jest.clearAllMocks();
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
        (Question.findById as jest.Mock).mockImplementation(() => {
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

    it("should return 404 if the question does not exist", async () => {
        (Question.findById as jest.Mock).mockResolvedValueOnce(null);

        const response = await supertest(server)
            .post("/question/flagQuestion/nonexistentQuestionId")
            .send();

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Question not found");
    });

    it("should return 500 if there is a database error while saving the question", async () => {
        const mockQuestion = {
            _id: "mockQuestionId",
            flagged: false,
            save: jest.fn().mockImplementationOnce(() => {
                throw new Error("Database error");
            }),
        };

        (Question.findById as jest.Mock).mockResolvedValueOnce(mockQuestion);

        const response = await supertest(server)
            .post("/question/flagQuestion/mockQuestionId")
            .send();

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error flagging question");
    });

    it("should return 404 when the question is not found during flagging", async () => {
        (Question.findById as jest.Mock).mockImplementationOnce(() => {
            const error = new Error("Question not found");
            error.message = "Question not found";
            throw error;
        });

        const response = await supertest(server)
            .post("/question/flagQuestion/nonexistentQuestionId")
            .send();

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Question not found");
    });

    it("should return 500 for unknown errors during flagging", async () => {
        (Question.findById as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Unexpected database error");
        });

        const response = await supertest(server)
            .post("/question/flagQuestion/mockQuestionId")
            .send();

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error flagging question");
    });

    it("should successfully upvote a question", async () => {
        const mockQuestion = {
            _id: "mockQuestionId",
            votes: 0,
            save: jest.fn().mockResolvedValue(true),
        };
        (Question.findById as jest.Mock).mockResolvedValueOnce(mockQuestion);

        const response = await supertest(server)
            .post("/question/mockQuestionId/vote")
            .send({ vote: "upvote" });

        // Assert the response
        expect(response.status).toBe(200);
        expect(mockQuestion.votes).toBe(1);

        // Construct the expected response without the `save` mock function
        const expectedResponse = {
            _id: "mockQuestionId",
            votes: 1,
        };
        expect(response.body).toEqual(expectedResponse);
    });

    it("should successfully downvote a question", async () => {
        const mockQuestion = {
            _id: "mockQuestionId",
            votes: 5,
            save: jest.fn().mockResolvedValue(true),
        };
        (Question.findById as jest.Mock).mockResolvedValueOnce(mockQuestion);

        const response = await supertest(server)
            .post("/question/mockQuestionId/vote")
            .send({ vote: "downvote" });

        console.log(response.body);
        console.log("response.status", response.status);
        console.log("mockQuestion.votes", mockQuestion.votes);
        console.log("mockQuestion", mockQuestion);

        // Assert the response
        expect(response.status).toBe(200);
        expect(mockQuestion.votes).toBe(4);

        // Create an expected response excluding the `save` mock
        const expectedResponse = {
            _id: "mockQuestionId",
            votes: 4,
        };
        expect(response.body).toEqual(expectedResponse);
    });


    it("should return 404 if the question is not found", async () => {
        (Question.findById as jest.Mock).mockResolvedValueOnce(null);

        const response = await supertest(server)
            .post("/question/nonexistentQuestionId/vote")
            .send({ vote: "upvote" });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Question not found");
    });

    it("should return 400 for an invalid vote action", async () => {
        const response = await supertest(server)
            .post("/question/mockQuestionId/vote")
            .send({ vote: "invalidVote" });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid vote action");
    });

    it("should return 500 if there is a server error during voting", async () => {
        (Question.findById as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Database error");
        });

        const response = await supertest(server)
            .post("/question/mockQuestionId/vote")
            .send({ vote: "upvote" });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error voting on question");
    });

    it("should return 404 if flaggedQuestion is null after saving", async () => {
        const mockQuestion = {
            _id: "mockQuestionId",
            flagged: false,
            save: jest.fn().mockResolvedValue(null), // Simulate a failure to save
        };

        // Mock `findById` to return the question
        (Question.findById as jest.Mock).mockResolvedValueOnce(mockQuestion);

        const response = await supertest(server)
            .post("/question/flagQuestion/mockQuestionId");

        // Assertions
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Question not found" });
    });

    it("should log an error if MongoDB connection fails", async () => {
        const mockError = new Error("Mock MongoDB Connection Error");

        const mongooseConnectSpy = jest
            .spyOn(mongoose, "connect")
            .mockRejectedValueOnce(mockError);

        try {
            require("../server");
        } catch (error) {
            expect(mongooseConnectSpy).toHaveBeenCalled();
        } finally {
            mongooseConnectSpy.mockRestore();
        }
    });

    it("should return a valid response for the root route", async () => {
        const response = await supertest(server).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("REST Service for Fake SO");
    });

});
