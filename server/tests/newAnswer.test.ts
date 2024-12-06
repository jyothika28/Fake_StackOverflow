import supertest from 'supertest';
import mongoose from 'mongoose';
import { saveAnswer, addAnswerToQuestion } from '../models/application';
import { Server } from 'http';
import Answer from "../models/answers";
import {flagAnswerById} from "../models/answers";

jest.mock('../models/application', () => ({
  saveAnswer: jest.fn(),
  addAnswerToQuestion: jest.fn(),
  findById: jest.fn(),
  flagAnswerById: jest.fn()
}));


jest.mock("../models/answers", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
  flagAnswerById: jest.fn(),
}));

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
    server.close();
    await mongoose.disconnect();
  });

  it("should flag an existing answer", async () => {
    console.log("Running test for successful flagging of an answer");

    // Mocking the answer
    const mockAnswer = {
      _id: '65e9b58910afe6e94fc6e6dc',
      text: 'ans1',
      ans_by: 'ans_by1',
      ans_date_time: new Date('2023-11-18T09:24:00'),
      flagged: false,
      save: jest.fn(),
    };

    // Mock the `save` method to simulate the flagged update
    mockAnswer.save.mockImplementation(function (this: typeof mockAnswer) {
      this.flagged = true; // Simulate flagged update
      return Promise.resolve(this);
    });

    // Mock `findById` to return the mocked answer
    (Answer.findById as jest.Mock).mockResolvedValueOnce(mockAnswer);

    // Mock `findByIdAndUpdate` to return the flagged answer
    (Answer.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({
      ...mockAnswer,
      flagged: true,
      ans_date_time: mockAnswer.ans_date_time.toISOString(), // Ensure string format for date
    });

    // Making the request
    const response = await supertest(server)
        .post(`/answer/flagAnswer/${mockAnswer._id}`)
        .send();

    // Logging
    console.log("Response status:", response.status);
    console.log("Response body:", response.body);

    // Assert response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "This answer has been flagged for review.",
      flaggedAnswer: {
        _id: mockAnswer._id,
        text: mockAnswer.text,
        ans_by: mockAnswer.ans_by,
        ans_date_time: mockAnswer.ans_date_time.toISOString(), // Match the expected string format
        flagged: true,
      },
    });
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
