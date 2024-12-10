import supertest from 'supertest';
import mongoose from 'mongoose';
import { getQuestionsByOrder, filterQuestionsBySearch } from '../models/application';
import { Server } from 'http';


jest.mock('../models/application', () => ({
  getQuestionsByOrder: jest.fn(),
  filterQuestionsBySearch: jest.fn(),
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
  ans_date_time: '2024-06-09' // The mock date is string type but in the actual implementation it is a Date type
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
    ask_date_time: '2024-06-03',
    views: 10
  },
  {
    _id: '65e9b5a995b6c7045a30d823',
    title: 'Question 2 Title',
    text: 'Question 2 Text',
    tags: [tag2],
    answers: [ans2, ans3],
    asked_by: 'question2_user',
    ask_date_time: '2024-06-04',
    views: 20
  },
  {
    _id: '34e9b58910afe6e94fc6e99f',
    title: 'Question 3 Title',
    text: 'Question 3 Text',
    tags: [tag1, tag2],
    answers: [ans4],
    asked_by: 'question3_user',
    ask_date_time: '2024-06-03',
    views: 101
  }
];

describe('GET /getQuestion', () => {

  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it('should return the result of filterQuestionsBySearch as response even if request parameters of order and search are absent', async () => {
    (getQuestionsByOrder as jest.Mock).mockResolvedValueOnce(mockQuestions);
    (filterQuestionsBySearch as jest.Mock).mockReturnValueOnce(mockQuestions);
    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion');

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestions);
  });

  it('should return the result of filterQuestionsBySearch as response for an order and search criteria in the request parameters', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'newest',
      search: 'Question',
    };
    (getQuestionsByOrder as jest.Mock).mockResolvedValueOnce(mockQuestions);
    (filterQuestionsBySearch as jest.Mock).mockReturnValueOnce(mockQuestions);
    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestions);
  });

  it('should return error if getQuestionsByOrder throws an error', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'dummyOrder',
      search: 'dummySearch',
    };
    (getQuestionsByOrder as jest.Mock).mockRejectedValueOnce(new Error('Error fetching questions'));
    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(500);
  });

  it('should return error if filterQuestionsBySearch throws an error', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'dummyOrder',
      search: 'dummySearch',
    };
    (filterQuestionsBySearch as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Error filtering questions');
    });

    (getQuestionsByOrder as jest.Mock).mockResolvedValueOnce(mockQuestions);

    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(500);

  });

  it("should return 500 if there is an error fetching questions", async () => {
    (getQuestionsByOrder as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await supertest(server)
        .get("/question/getQuestion?order=newest");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Error fetching questions");
  });

  it("should return 500 if the order parameter is invalid", async () => {
    const response = await supertest(server)
        .get("/question/getQuestion?order=invalidOrder");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Invalid order parameter");
  });

});
