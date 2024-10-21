import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { MONGO_URL, port } from './config';

mongoose.connect(MONGO_URL)
    .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();

app.get('/', (_: Request, res: Response) => {
    res.send('Fake SO Server Dummy Endpoint');
    res.end();
});

const server = app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed.');
    });
    mongoose.disconnect().then(() => {
        console.log('Database instance disconnected.');
        process.exit(0);
    }).catch((err) => {
        console.error('Error during disconnection:', err);
        process.exit(1);
    });
});


module.exports = server;