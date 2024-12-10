import supertest from 'supertest';
import mongoose from 'mongoose';
import { saveAnswer, addAnswerToQuestion } from '../models/application';
import { Server } from 'http';
import Answer from "../models/answers";

jest.mock('../models/application', () => ({
  saveAnswer: jest.fn(),
  addAnswerToQuestion: jest.fn(),
  findById: jest.fn()
}));


jest.mock("../models/answers", () => ({
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn()
}));

const mockAnswer = {
  _id: "65e9b58910afe6e94fc6e6dc",
  text: "This is a test answer",
  ans_date_time: new Date('2023-11-18T09:24:00'),
  ans_by: 'ans_by1',
  comments: [
    {
      _id: "mockCommentId",
      text: "This is a mock comment",
      commented_by: "mockUserId",
      comment_date_time: expect.any(Date),
      votes: 0,
    },
  ],
  flagged: false,
  save: jest.fn().mockResolvedValue(true),
};

let server: Server;
describe("POST /addAnswer", () => {

  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it("should add a new answer to the question", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03"
      }
    };

    const mockAnswer = {
      _id: "dummyAnswerId",
      text: "This is a test answer",
      ans_by: "dummyUserId",
      ans_date_time: "2024-06-03"
    };

    // Mock the create method of the Answer model
    (saveAnswer as jest.Mock).mockResolvedValueOnce(mockAnswer);
    (addAnswerToQuestion as jest.Mock).mockResolvedValueOnce({
      _id: "dummyQuestionId",
      answers: ["dummyAnswerId"]
    });

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAnswer);
  });

  it("should return bad request error if answer text property is missing", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03"
      }
    };

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid answer");
  });

  it("should return bad request error if request body has qid property missing", async () => {
    // Mocking the request body
    const mockReqBody = {
      ans: {
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03"
      }
    };

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
  });

  it("should return bad request error if answer object has ans_by property missing", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_date_time: "2024-06-03"
      }
    };

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
  });

  it("should return bad request error if answer object has ans_date_time property missing", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId"
      }
    };

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
  });

  it("should return bad request error if request body is missing", async () => {
    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer");

    // Asserting the response
    expect(response.status).toBe(400);
  });

  it("should return database error in response if saveAnswer method throws an error", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03"
      }
    };

    (saveAnswer as jest.Mock).mockResolvedValueOnce({ error: "Database error" });

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(500);
  });

  it("should return database error in response if update question method throws an error", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03"
      }
    };

    const mockAnswer = {
      _id: "dummyAnswerId",
      text: "This is a test answer",
      ans_by: "dummyUserId",
      ans_date_time: "2024-06-03"
    };

    (saveAnswer as jest.Mock).mockResolvedValueOnce(mockAnswer);
    (addAnswerToQuestion as jest.Mock).mockImplementation(() => {
      throw new Error("Database error");
    });
    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(500);
  });
});

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
    // Mock findByIdAndUpdate to return null (not found)
    (Answer.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    // Making the request
    const response = await supertest(server)
        .post("/answer/flagAnswer/nonexistentAnswerId");

    // Asserting the response
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Answer not found" });
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
});