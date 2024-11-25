import supertest from 'supertest';
import mongoose from 'mongoose';
import { getTagCountMap } from '../models/application';
import { Server } from 'http';

jest.mock('../models/application', () => ({
    getTagCountMap: jest.fn(),
}));

let server: Server;

describe('GET /getTagsWithQuestionNumber', () => {

    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it('should return tags with question numbers', async () => {
        const mockTagCountMap = new Map<string, number>();
        mockTagCountMap.set('tag1', 2);
        mockTagCountMap.set('tag2', 1);
        (getTagCountMap as jest.Mock).mockResolvedValueOnce(mockTagCountMap);

        // Making the request
        const response = await supertest(server).get('/tag/getTagsWithQuestionNumber');

        // Asserting the response
        expect(response.status).toBe(200);

        // Asserting the response body
        expect(response.body).toEqual([
            { name: 'tag1', qcnt: 2 },
            { name: 'tag2', qcnt: 1 },
        ]);
    });

    it('should return error 500 if getTagCountMap returns null', async () => {
        (getTagCountMap as jest.Mock).mockResolvedValueOnce(null);

        // Making the request
        const response = await supertest(server).get('/tag/getTagsWithQuestionNumber');

        // Asserting the response
        expect(response.status).toBe(500);
    });

    it('should return error 500 if getTagCountMap throws an error', async () => {
        (getTagCountMap as jest.Mock).mockRejectedValueOnce(new Error('Error fetching tags'));

        // Making the request
        const response = await supertest(server).get('/tag/getTagsWithQuestionNumber');

        // Asserting the response
        expect(response.status).toBe(500);
    });
});
