import supertest from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import Question from "../models/questions";
import { flagQuestionById } from "../models/questions";

jest.mock("../models/questions", () => ({
    flagQuestionById: jest.fn(),
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
        console.log("Starting server before test");
        server = require("../server");
        console.log("Server started successfully");
    });

    afterEach(async () => {
        console.log("Closing server after test");
        server.close();
        console.log("Server closed");
        console.log("Disconnecting from MongoDB");
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    });

    it("should flag the question and return a success message", async () => {
        console.log("Running test for successful flagging of a question");

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

        console.log("MockQuestion before request:", mockQuestion);

        // Mock the `save` method to simulate the flagged update
        mockQuestion.save.mockImplementation(function (this: typeof mockQuestion) {
            this.flagged = true; // Simulate flagged update
            return Promise.resolve(this);
        });

        // Mock the flagQuestionById function
        const mockFlaggedQuestion = { ...mockQuestion, flagged: true };
        console.log("MockFlaggedQuestion:", mockFlaggedQuestion);
        // Mock the `findById` call to return the mocked question
        (Question.findById as jest.Mock).mockImplementation((id) => {
            console.log("Mock findById called with ID:", id);
            return mockQuestion; // or `null` based on test case
        });
        (flagQuestionById as jest.Mock).mockResolvedValue(mockFlaggedQuestion);

        console.log("Mock setup for findById completed");


        // Making the request
        const response = await supertest(server)
            .post(`/question/flagQuestion/${mockQuestion._id}`)
            .send();

        console.log("Response status:", response.status);
        console.log("Response body:", response.body);

        // Assert response
        console.log("Asserting response", response.status);
        expect(response.status).toBe(200);
        console.log("Response body message:", response.body.message);
        expect(response.body.message).toBe("This post has been flagged for review.");

        // Assert that the question's `flagged` field was updated
        console.log("MockQuestion after request:", mockQuestion);
        expect(response.body.flaggedQuestion.flagged).toBe(true);
    });

    it("should return 404 if the question is not found", async () => {
        console.log("Running test for question not found");

        // Mock `findById` to return null (simulate question not found)
        (Question.findById as jest.Mock).mockResolvedValueOnce(null);
        console.log("Mock setup for findById returning null");

        // Make the POST request with a non-existent question ID
        const response = await supertest(server)
            .post(`/question/flagQuestion/2`)
            .send();

        console.log("Response status:", response.status);
        console.log("Response body:", response.body);

        // Assert response
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Question not found");
    });

    it("should return 500 if an error occurs during flagging", async () => {
        console.log("Running test for server error during flagging");

        // Mock `findById` to throw an error (e.g., database issue)
        (Question.findById as jest.Mock).mockRejectedValue(new Error("Database error"));
        console.log("Mock setup for findById throwing an error");

        // Make the POST request
        const response = await supertest(server).post(
            `/question/flagQuestion/65e9b58910afe6e94fc6e6fe`
        );

        console.log("Response status:", response.status);
        console.log("Response body:", response.body);

        // Assert response
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error flagging question");
    });
});
