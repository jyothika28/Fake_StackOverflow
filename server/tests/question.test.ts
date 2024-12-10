import supertest from 'supertest';
import mongoose from 'mongoose';
import { fetchAndIncrementQuestionViewsById } from '../models/application';
import { Server } from 'http';

jest.mock('../models/application', () => ({
  fetchAndIncrementQuestionViewsById: jest.fn()
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

const ans1 = {
  _id: '65e9b58910afe6e94fc6e6dc',
  text: 'Answer 1 Text',
  ans_by: 'answer1_user',
  ans_date_time: '2024-06-09'
};

const ans2 = {
  _id: '65e9b58910afe6e94fc6e6dd',
  text: 'Answer 2 Text',
  ans_by: 'answer2_user',
  ans_date_time: '2024-06-10'
};

const ans3 = {
  _id: '65e9b58910afe6e94fc6e6df',
  text: 'Answer 3 Text',
  ans_by: 'answer3_user',
  ans_date_time: '2024-06-11'
};

const ans4 = {
  _id: '65e9b58910afe6e94fc6e6dg',
  text: 'Answer 4 Text',
  ans_by: 'answer4_user',
  ans_date_time: '2024-06-14'
};

const mockQuestions = [
  {
    _id: '65e9b58910afe6e94fc6e6dc',
    title: 'Question 1 Title',
    text: 'Question 1 Text',
    tags: [tag1],
    answers: [ans1],
    asked_by: 'question1_user',
    ask_date_time: new Date('2024-06-03'),
    views: 10
  },
  {
    _id: '65e9b5a995b6c7045a30d823',
    title: 'Question 2 Title',
    text: 'Question 2 Text',
    tags: [tag2],
    answers: [ans2, ans3],
    asked_by: 'question2_user',
    ask_date_time: new Date('2024-06-04'),
    views: 20
  },
  {
    _id: '34e9b58910afe6e94fc6e99f',
    title: 'Question 3 Title',
    text: 'Question 3 Text',
    tags: [tag1, tag2],
    answers: [ans4],
    asked_by: 'question3_user',
    ask_date_time: new Date('2024-06-03'),
    views: 101
  }
];

describe('GET /getQuestionById/:qid', () => {

  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it('should return a question object in the response when the question id is passed as request parameter', async () => {

    // Mock request parameters
    const mockReqParams = {
      qid: '65e9b5a995b6c7045a30d823',
    };

    const mockPopulatedQuestion = {
      ...mockQuestions.find(q => q._id == mockReqParams.qid)!,
      views: mockQuestions.find(q => q._id == mockReqParams.qid)!.views + 1,
      ask_date_time: mockQuestions.find(q => q._id == mockReqParams.qid)!.ask_date_time.toISOString()
    };

    // Provide mock question data
    (fetchAndIncrementQuestionViewsById as jest.Mock).mockResolvedValueOnce(mockPopulatedQuestion);

    // Making the request
    const response = await supertest(server)
      .get(`/question/getQuestionById/${mockReqParams.qid}`);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPopulatedQuestion);
  });

  it('should return bad request error if the question id is not found in the database', async () => {
    // Mock request parameters
    const mockReqParams = {
      qid: '65e9b5a995b6c7045a30d823',
    };

    (fetchAndIncrementQuestionViewsById as jest.Mock).mockResolvedValueOnce(null);

    // Making the request
    const response = await supertest(server)
      .get(`/question/getQuestionById/${mockReqParams.qid}`);

    // Asserting the response
    expect(response.status).toBe(500);
  });

  it('should return bad request error if an error occurs when fetching and updating the question', async () => {
    // Mock request parameters
    const mockReqParams = {
      qid: '65e9b5a995b6c7045a30d823',
    };

    (fetchAndIncrementQuestionViewsById as jest.Mock).mockResolvedValueOnce({ error: "Error when fetching and updating a question" });

    // Making the request
    const response = await supertest(server)
      .get(`/question/getQuestionById/${mockReqParams.qid}`);

    // Asserting the response
    expect(response.status).toBe(500);
  });

  it("should fetch and update question views successfully", async () => {
    const mockQuestion = {
      _id: "mockQuestionId",
      title: "Mock Question",
      text: "This is a mock question",
      views: 10,
    };

    (fetchAndIncrementQuestionViewsById as jest.Mock).mockResolvedValueOnce(mockQuestion);

    const response = await supertest(server)
        .get("/question/getQuestionById/mockQuestionId");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestion);
  });

  it("should return 500 if there is an error fetching question", async () => {
    (fetchAndIncrementQuestionViewsById as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await supertest(server)
        .get("/question/getQuestionById/mockQuestionId");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Error when fetching and updating a question");
  });

  it("should return 500 if fetching question returns an error object", async () => {
    (fetchAndIncrementQuestionViewsById as jest.Mock).mockResolvedValueOnce({ error: "Error retrieving question" });

    const response = await supertest(server)
        .get("/question/getQuestionById/mockQuestionId");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Error when fetching and updating a question");
  });


});
