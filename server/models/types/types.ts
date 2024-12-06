import { Request, Response } from "express";
import mongoose from "mongoose";



/**
 * @typedef LoginRequest - Interface for Login
 * @property {string} username.required - Email of the user
 * @property {string} password.required - Password of the user
 */

export interface LoginRequest extends Request {
  body: {
  username: string;
  password: string;
  };
}

/**
 * @typedef RegisterRequest - Interface for Register
 * @property {string} firstname.required - First name of the user
 * @property {string} lastname.required - Last name of the user
 * @property {string} username.required - Username of the user
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 * @property {Date} dob - Date of birth of the user
 * 
 */
export interface RegisterRequest extends Request {
  body: {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  dob?: Date;
  };
}

/**
 * @typedef IUser - Interface for User
 * @property {string} firstname.required - First name of the user
 * @property {string} lastname.required - Last name of the user
 * @property {string} username.required - Username of the user
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 * @property {Date} dob - Date of birth of the user
 */
export interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  dob?: Date;
}
/**
 * @typedef ITag - Interface for Tag
 * @property {string} name.required - Name of the tag
 * @property {string} _id - Unique identifier of the tag
 */
export interface ITag {
  _id?: string;
  name: string;
}

/**
 * @typedef IAnswer - Interface for Answer
 * @property {string} text.required - Text of the answer
 * @property {string} ans_by.required - Answered by
 * @property {string} _id - Unique identifier of the answer
 * @property {Date} ans_date_time.required - Date and time of the answer
 */
export interface IAnswer extends mongoose.Document {
  _id?: string;
  text: string;
  ans_by: string;
  ans_date_time: Date;
  flagged?: boolean;
}

/**
 * @typedef IQuestion - Interface for Question
 * @property {string} title.required - Title of the question
 * @property {string} text.required - Text of the question
 * @property tags - Tags of the question
 * @property answers - Answers of the question
 * @property {string} asked_by - Asked by
 * @property {Date} ask_date_time.required - Date and time of the question
 * @property {number} views - Views of the question
 * @property {string} _id - Unique identifier of the question
 */
export interface IQuestion {
  _id?: string;
  title: string;
  text: string;
  tags: ITag[];
  answers: IAnswer[];
  asked_by?: string;
  ask_date_time: Date;
  views: number;
  flagged?: boolean;
}

export interface IComment {
  text: string;
  commented_by: string;
  comment_date_time: Date;
  upvotes: number;
  downvotes: number;
}

export interface AddCommentRequest extends Request {
  params: {
    answerId: string;
  };
  body: {
    text: string;
    commented_by: string;
  };
}


/**
 * @typedef HTTP Request parameter for adding an answer
 * @property {string} qid.required - Question ID
 * @property {IAnswer} ans.required - Answer
 */
export interface AddAnswerRequest extends Request {
  body: {
    qid: string;
    ans: IAnswer;
  };
}

/**
 * @typedef HTTP Response for adding an answer
 * @property {string} ans_by - Answered by
 * @property {string} ans_date_time - Date and time of the answer
 * @property {string} text - Text of the answer
 * @property {string} _id - Unique identifier of the answer
 */
export interface AddAnswerResponse extends Response {
  ans_by: string;
  ans_date_time: string;
  text: string;
  _id: string;
}

/**
 * @typedef HTTP Request parameter for getting questions by search string and order
 * @property {string} order - Order of the questions
 * @property {string} search - Search query
 */
export interface GetQuestionsByFilterRequest extends Request {
  query: {
    order?: string;
    search?: string;
  };
}



/**
 * @typedef HTTP Request parameter for getting questions by question id
 * @property {string} qid - Question ID
 */
export interface GetQuestionByIdRequest extends Request {
  params: {
    qid: string;
  };
}

/**
 * @typedef HTTP Request for adding a new question
 * @property {IQuestion} body.required - Question
 */
export interface AddQuestionRequest extends Request {
  body: IQuestion;
}

/**
 * @typedef HTTP Response for adding a new question
 * @property {string} _id - Unique identifier of the question
 * @property {string} title - Title of the question
 * @property {string} text - Text of the question
 * @property {ITag[]} tags - Tags of the question
 * @property {IAnswer[]} answers - Answers of the question
 * @property {string} asked_by - Asked by
 * @property {string} ask_date_time - Date and time of the question
 * @property {number} views - Views of the question
 */
export interface QuestionAPIResponse extends Response {
  _id: string;
  title: string;
  text: string;
  tags: ITag[];
  answers: IAnswer[];
  asked_by: string;
  ask_date_time: string;
  views: number;
}
