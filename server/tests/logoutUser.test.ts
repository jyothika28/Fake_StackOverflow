import supertest from 'supertest';
import mongoose from 'mongoose';
import { Server } from 'http';
import { logoutUser } from '../models/application'; // Adjust the path as necessary

jest.mock('../models/application', () => ({
  logoutUser: jest.fn(),
}));

let server: Server;

describe('POST /logout', () => {
  beforeEach(() => {
    server = require('../server');
  });

  afterEach(async () => {
    jest.resetAllMocks();
    server.close();
    await mongoose.disconnect();
  });

  it('should log out the user successfully', async () => {
    // Mock session object
    const mockSession = {
      destroy: jest.fn((callback) => callback(null)),
    };

    // Mock logoutUser to resolve successfully
    (logoutUser as jest.Mock).mockImplementationOnce((session) => {
      return new Promise<void>((resolve) => {
        session.destroy((error: Error) => {
          if (error) {
            throw new Error('Session destruction error');
          }
          resolve();
        });
      });
    });

    // Making the request
    const response = await supertest(server)
      .post('/user/logout')
      .send()
      .set('Cookie', `connect.sid=${mockSession}`);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'User logged out successfully',
    });
  }
  );

    it('should return 500 if an error occurs during logout', async () => {
      // Mock session object
      const mockSession = {
        destroy: jest.fn((callback) => callback(new Error('Session destruction error'))),
      };

      // Mock logoutUser to reject
      (logoutUser as jest.Mock).mockRejectedValueOnce(new Error('Session destruction error'));

      // Making the request
      const response = await supertest(server)
        .post('/user/logout')
        .send()
        .set('Cookie', `connect.sid=${mockSession}`);

      // Asserting the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        message: 'An error occurred during logout',
      });
    });
  });
