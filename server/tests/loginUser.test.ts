import supertest from 'supertest';
import mongoose from 'mongoose';
import { Server } from 'http';
import { authenticateUser } from '../models/application'; // Adjust the path as necessary

jest.mock('../models/application', () => ({
  authenticateUser: jest.fn(),
}));

let server: Server;

describe('POST /login', () => {
  beforeEach(() => {
    server = require('../server');
  });

  afterEach(async () => {
    jest.resetAllMocks();
    server.close();
    await mongoose.disconnect();
  });

  it('the user is logged in successfully', async () => {
    // Mock request body
    const mockUserLogin = {
      username: 'rachelgreen',
      password: 'Rachelhomie@123',
    };

    // Mock user object returned by authenticateUser
    const mockUser = {
      username: 'rachelgreen',
      firstname: 'Rachel',
      lastname: 'Green',
      email: 'rachelgreen@example.com',
    };

    (authenticateUser as jest.Mock).mockResolvedValueOnce(mockUser);

    // Making the request
    const response = await supertest(server)
      .post('/user/login')
      .send(mockUserLogin);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'User logged in successfully',
    });
  });

  it('should return validation error if username is empty', async () => {
    // Mock request body with empty username
    const mockUserLogin = {
      username: '',
      password: 'Rachelhomie@123',
    };

    // Making the request
    const response = await supertest(server)
      .post('/user/login')
      .send(mockUserLogin);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        success: false,
        errors: {
          username: "Username cannot be empty.",
        },
      });
  });

  it('should return validation error if password is empty', async () => {
    // Mock request body with empty password
    const mockUserLogin = {
      username: 'rachelgreen',
      password: '',
    };

    // Making the request
    const response = await supertest(server)
      .post('/user/login')
      .send(mockUserLogin);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        success: false,
        errors: {
          password: "Password cannot be empty.",
        },
      });
  });

  it('should return 500 if an error occurs during login', async () => {
    // Mock request body
    const mockUserLogin = {
      username: 'rachelgreen',
      password: 'Rachelhomie@123',
    };

    // Mock authenticateUser to throw an error
    (authenticateUser as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    // Making the request
    const response = await supertest(server)
      .post('/user/login')
      .send(mockUserLogin);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Database error',
    });
  });
});