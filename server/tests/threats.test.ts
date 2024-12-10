import supertest from "supertest";
import { Server } from "http";
import mongoose from "mongoose";
import Answer from "../models/answers";

jest.mock("../models/answers", () => ({
    findById: jest.fn(),
}));

let server: Server;

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

describe("Rate Limiting", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        jest.clearAllMocks();
        server.close();
        await mongoose.disconnect();
    });

    it("should throttle requests when rate limit is exceeded", async () => {
        const commentData = { text: "Test comment", commented_by: "testUser" };
        (Answer.findById as jest.Mock).mockResolvedValue(mockAnswer);

        for (let i = 0; i < 16; i++) {
            const res = await supertest(server)
                .post("/comment/answer/65e9b58910afe6e94fc6e6dc/comment")
                .send(commentData);

            if (i < 15) {
                expect(res.status).toBe(200); // Requests within the limit
            } else {
                expect(res.status).toBe(429); // Rate limit exceeded
                expect(res.body.error).toBe("Too many requests. Please try again later.");
            }
        }
    });

});
