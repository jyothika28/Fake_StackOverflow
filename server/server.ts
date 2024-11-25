import cors from 'cors';
import mongoose from 'mongoose';
import express, { type Express } from 'express';
import { Server } from 'http'; // Import the Server type from Node.js

const MONGO_URL: string = 'mongodb://127.0.0.1:27017/fake_so';
const CLIENT_URL: string = 'http://localhost:3000';
const port: number = 8000;

mongoose.connect(MONGO_URL);

const app: Express = express();

/**
 * Middleware to allow cross-origin requests
 * from the client-side
 */
app.use(
  cors({
    credentials: true,
    origin: [CLIENT_URL],
  })
);

/**
 * Middleware to parse incoming requests
 */
app.use(express.json());

app.get('/', (req, res) => {
  res.send('REST Service for Fake SO');
  res.end();
});

import answerController from './controller/answer';
import questionController from './controller/question';
import tagController from './controller/tag';

app.use('/question', questionController);
app.use('/tag', tagController);
app.use('/answer', answerController);


// Start the server and assign it to the 'server' variable
const server: Server = app.listen(port, () => {
  console.log(`Server starts at http://localhost:${port}`);
});

/**
 * Gracefully close the server and the database connection
 */
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
