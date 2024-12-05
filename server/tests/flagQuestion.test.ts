import supertest from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import Question from "../models/questions";

jest.mock("../models/questions", () => ({
    findById: jest.fn(),
}));

let server: Server;

describe("POST /flagQuestion/:qid", () => {
    beforeEach(() => {
        // Require the server and start it before each test
        const app = require("../server");
        server = app.listen(4000);
    });

    afterEach(async () => {
        // Close the server and disconnect from mongoose after each test
        await mongoose.disconnect();
        server.close();
    });

    it("should flag the question and return a success message", async () => {
        // Mocked question document
        const mockQuestion = {
            _id: new mongoose.Types.ObjectId("65e9b58910afe6e94fc6e6fe"),
            title: "Mock Question Title",
            text: "Mock Question Text",
            flagged: false,
            save: jest.fn(),
        };

        // Mock the `findById` call to return the mocked question
        (Question.findById as jest.Mock).mockResolvedValue(mockQuestion);

        // Make the POST request to flag the question
        const response = await supertest("http://localhost:4000").post(
            `/question/flagQuestion/${mockQuestion._id}`
        );

        // Assert response
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("This post has been flagged for review.");

        // Assert that the question's `flagged` field was updated
        expect(mockQuestion.flagged).toBe(true);
        expect(mockQuestion.save).toHaveBeenCalled();
    });

    it("should return 404 if the question is not found", async () => {
        // Mock `findById` to return null (question not found)
        (Question.findById as jest.Mock).mockResolvedValue(null);

        // Make the POST request with a non-existent question ID
        const response = await supertest("http://localhost:4000").post(
            `/question/flagQuestion/65e9b58910afe6e94fc6e6fe`
        );

        // Assert response
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Question not found");
    });

    it("should return 500 if an error occurs during flagging", async () => {
        // Mock `findById` to throw an error (e.g., database issue)
        (Question.findById as jest.Mock).mockRejectedValue(new Error("Database error"));

        // Make the POST request
        const response = await supertest("http://localhost:4000").post(
            `/question/flagQuestion/65e9b58910afe6e94fc6e6fe`
        );

        // Assert response
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error flagging question");
    });
});
