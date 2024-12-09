import supertest from 'supertest';
import mongoose from 'mongoose';
import { Server } from 'http';
import { authenticateUser } from '../models/application'; // Adjust the path as necessary
import { validateLoginRequest } from '../validators/userValidator';
import {LoginRequest} from "../models/types/types"; // Adjust the import path as needed

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


describe('validateLoginRequest', () => {
  afterEach(async () => {
    jest.resetAllMocks();
    server.close();
    await mongoose.disconnect();
  });
  it('should return an error if username is empty', () => {
    const req = {
      body: {
        username: '',
        password: 'validPassword123'
      }
    };

    const { isValid, errors } = validateLoginRequest(req as LoginRequest);

    expect(isValid).toBe(false);
    expect(errors).toEqual(
      {
        username: "Username cannot be empty.",
      }
    );
  });

  it('should return an error if password is empty', () => {
    const req = {
      body: {
        username: 'validUsername',
        password: ''
      }
    };

    const { isValid, errors } = validateLoginRequest(req as LoginRequest);

    expect(isValid).toBe(false);
    expect(errors).toEqual(
      {
        password: "Password cannot be empty.",
      }
    );
  });
  it('should return no errors if username and password are provided', () => {
    const req = {
      body: {
        username: 'validUsername',
        password: 'validPassword@123'
      }
    };

    const { isValid, errors } = validateLoginRequest(req as LoginRequest);

    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });
  // it('should return 400 if username or password is empty', async () => {
  //   // Mock request body
  //   const req = {
  //     body: {
  //       username: '',
  //       password: 'validPassword@123'
  //     }
  //   };

  //   const { isValid, errors } = validateLoginRequest(req as any);
  //   //return res.status(400).json({ success: false, errors });
  //   expect(response.status).toBe(400);
  //   expect(response.json).toEqual({
  //     sucess: false,
  //     errors: {
  //       username: "Username cannot be empty.",
  //     }
  //   });

  // });

});

describe('GET /check', () => {
  beforeEach(() => {
    server = require('../server');
  });

  afterEach(async () => {
    jest.resetAllMocks();
    server.close();
    await mongoose.disconnect();
  });

  it('should return 401 if the user is not logged in', async () => {
    // Mock session object
    const mockSession = {};

    // Making the request
    const response = await supertest(server)
      .get('/user/check')
      .set('Cookie', `connect.sid=${mockSession}`);

    // Asserting the response
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: 'User is not logged in',
    });
  });
});

