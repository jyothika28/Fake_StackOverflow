import supertest from 'supertest';
import mongoose from 'mongoose';
import { getTagIds, saveQuestion } from '../models/application';
import { Server } from 'http';

jest.mock('../models/application', () => ({
  getTagIds: jest.fn(),
  saveQuestion: jest.fn()
}));

let server: Server;

const tag1 = {
  _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
  name: 'tag1'
};
const tag2 = {
  _id: new mongoose.Types.ObjectId('65e9a5c2b26199dbcc3e6dc8'),
  name: 'tag2'
};

describe('POST /addQuestion', () => {

  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it('should add a new question', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06'),
    };

    (getTagIds as jest.Mock).mockResolvedValue([tag1._id, tag2._id]);
    (saveQuestion as jest.Mock).mockResolvedValueOnce(mockQuestion);

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...mockQuestion, _id: mockQuestion._id.toString(), ask_date_time: mockQuestion.ask_date_time.toISOString() });
  });

  it('should return 500 if error occurs while adding a new question', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06')
    };

    (getTagIds as jest.Mock).mockResolvedValue([tag1._id, tag2._id]);
    (saveQuestion as jest.Mock).mockResolvedValueOnce({ error: 'Error while saving question' });

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(500);
  });

  it('should return 500 if tag ids could not be retrieved', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06')
    };

    (getTagIds as jest.Mock).mockResolvedValueOnce([]);

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(500);
  });

  it('should return bad request if question title is missing', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06')
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if question title is empty string', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: '',
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06')
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if question text is missing', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06')
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if question text is empty string', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: '',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06')
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if tags are missing', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06')
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if tags are empty', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      tags: [],
      asked_by: 'question3_user',
      ask_date_time: new Date('2024-06-06')
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if asked_by is missing', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      ask_date_time: new Date('2024-06-06')
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if asked_by is empty string', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      asked_by: '',
      ask_date_time: new Date('2024-06-06')
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if ask_date_time is missing', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user'
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });

  it('should return bad request if ask_date_time is empty string', async () => {
    // Mock request body
    const mockQuestion = {
      _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6fe'),
      title: 'New Question Title',
      text: 'New Question Text',
      tags: [tag1.name, tag2.name],
      asked_by: 'question3_user',
      ask_date_time: null,
    };

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid question body');
  });
});
