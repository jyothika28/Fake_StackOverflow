import supertest from "supertest";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;

describe("Rate Limiting", () => {
    it("should throttle requests when rate limit is exceeded", async () => {
        const commentData = { text: "Test comment", commented_by: "testUser" };

        for (let i = 0; i < 11; i++) {
            const res = await supertest(server)
                .post("/comment/answer/testAnswerId/comment")
                .send(commentData);

            if (i < 10) {
                expect(res.status).toBe(200); // Requests within the limit
            } else {
                expect(res.status).toBe(429); // Rate limit exceeded
                expect(res.body.error).toBe("Too many requests. Please try again later.");
            }
        }
    });
});
