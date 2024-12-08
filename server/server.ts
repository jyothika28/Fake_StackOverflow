import cors from "cors";
import mongoose from "mongoose";
import express, { type Express,Request,Response } from "express";
import { Server } from "http"; // Import the Server type from Node.js
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();
/**
 * Extend the SessionData interface
 * to include custom session properties.
 * This is an example of module augmentation in TypeScript
 * to extend the express-session module with custom properties
 * Read more at https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 **/
declare module "express-session" {
  interface SessionData {
    user?: string;
    sensitive?: string;
  }
}

// USE WHEN RUNNING LOCALLY
// const MONGO_URL: string =  'mongodb://127.0.0.1:27017/fake_so';
// const CLIENT_URL: string ='http://localhost:3000';

// USE WHEN DEPLOYING TO RENDER
const MONGO_URL: string =
  process.env.REACT_APP_MONGODB_URI || "mongodb://127.0.0.1:27017/fake_so";
const CLIENT_URL: string =
  process.env.REACT_APP_CLIENT_URL || "http://localhost:3000";

const port = process.env.PORT || 8000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

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

app.use(express.urlencoded({ extended: false }));

// middleware to create a session with secure configuration

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      collectionName: "MySessions",
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req:Request, res:Response) => {
  console.log(req.session);
  res.send("REST Service for Fake SO");
  res.end();
});

import answerController from "./controller/answer";
import questionController from "./controller/question";
import tagController from "./controller/tag";
import userController from "./controller/user";
import commentController from "./controller/comment";
import vote from "./controller/vote";

app.use("/question", questionController);
app.use("/tag", tagController);
app.use("/answer", answerController);
app.use("/user", userController);
app.use("/comment", commentController);
app.use("/vote", vote);

// Start the server and assign it to the 'server' variable
const server: Server = app.listen(port, () => {
  console.log(`Server starts at http://localhost:${port}`);
});

/**
 * Gracefully close the server and the database connection
 */
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed.");
  });
  mongoose
    .disconnect()
    .then(() => {
      console.log("Database instance disconnected.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error during disconnection:", err);
      process.exit(1);
    });
});

module.exports = server;
