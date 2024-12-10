// Run this script to test your schema
// Start the mongoDB service as a background process before running the script
// Pass URL of your mongoDB instance as first argument(e.g., mongodb://127.0.0.1:27017/fake_so)

import mongoose from 'mongoose';

import Answer from './models/answers';
import Question from './models/questions';
import Tag from './models/tags';
import User from './models/users';
import Comment from './models/comments';
import { ITag, IAnswer, IQuestion, IUser, IComment } from './models/types/types';
import {
  Q1_DESC, Q1_TXT,
  Q2_DESC, Q2_TXT,
  Q3_DESC, Q3_TXT,
  Q4_DESC, Q4_TXT,
  A1_TXT, A2_TXT,
  A3_TXT, A4_TXT,
  A5_TXT, A6_TXT,
  A7_TXT, A8_TXT
} from './data/posts_strings';
import bcrypt from 'bcrypt';

const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
  console.log('ERROR: You need to specify a valid MongoDB URL as the first argument');
  process.exit(1);
}

const mongoDB = userArgs[0];

mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function tagCreate(name: string): Promise<ITag> {
  const tag = new Tag({ name });
  return tag.save();
}

function commentCreate(text: string, commented_by: string, votes: number, flagged: boolean): Promise<IComment> {
  const commentDetail: IComment = { text, commented_by, comment_date_time: new Date(), votes, flagged };
  const comment = new Comment(commentDetail);
  return comment.save();
}

function answerCreate(text: string, ans_by: string, ans_date_time: Date, comments: IComment[] = []): Promise<IAnswer> {
  const answerDetail: IAnswer = { text, ans_by, ans_date_time, votes: 0, flagged: false, comments };

  const answer = new Answer(answerDetail);
  return answer.save();
}

function questionCreate(title: string, text: string, tags: ITag[], answers: IAnswer[], asked_by: string, ask_date_time: Date, views: number): Promise<IQuestion> {
  const qstnDetail: IQuestion = { title, text, tags, answers, asked_by, ask_date_time, views, votes: 0, flagged: false };
  const qstn = new Question(qstnDetail);
  return qstn.save();
}

function userCreate(firstname: string, lastname: string, username: string, email: string, password: string, dob: Date): Promise<IUser> {
  const userDetail: IUser = { firstname, lastname, username, email, password, dob };

  const user = new User(userDetail);
  return user.save();
}

const populate = async () => {
  try {
    const t1 = await tagCreate('react');
    const t2 = await tagCreate('javascript');
    const t3 = await tagCreate('android-studio');
    const t4 = await tagCreate('shared-preferences');
    const t5 = await tagCreate('storage');
    const t6 = await tagCreate('website');

    const c1 = await commentCreate('This is a great comment', 'user1', 5, false);
    const c2 = await commentCreate('I disagree with this point', 'user2', 2, false);
    const c3 = await commentCreate('Needs more explanation', 'user3', 0, false);
    const c4 = await commentCreate('Very helpful!', 'user4', 10, false);

    const a1 = await answerCreate(A1_TXT, 'hamkalo', new Date('2023-11-20T03:24:42'), [c1, c2]);
    const a2 = await answerCreate(A2_TXT, 'azad', new Date('2023-11-23T08:24:00'), [c3]);
    const a3 = await answerCreate(A3_TXT, 'abaya', new Date('2023-11-18T09:24:00'), [c4]);
    const a4 = await answerCreate(A4_TXT, 'alia', new Date('2023-11-12T03:30:00'));
    const a5 = await answerCreate(A5_TXT, 'sana', new Date('2023-11-01T15:24:19'));
    const a6 = await answerCreate(A6_TXT, 'abhi3241', new Date('2023-02-19T18:20:59'));
    const a7 = await answerCreate(A7_TXT, 'mackson3332', new Date('2023-02-22T17:19:00'));
    const a8 = await answerCreate(A8_TXT, 'ihba001', new Date('2023-03-22T21:17:53'));

    await questionCreate(Q1_DESC, Q1_TXT, [t1, t2], [a1, a2], 'Joji John', new Date('2022-01-20T03:00:00'), 10);
    await questionCreate(Q2_DESC, Q2_TXT, [t3, t4, t2], [a3, a4], 'saltyPeter', new Date('2023-01-10T11:24:30'), 121);
    await questionCreate(Q3_DESC, Q3_TXT, [t5, t6], [a6, a7], 'monkeyABC', new Date('2023-02-18T01:02:15'), 200);
    await questionCreate(Q4_DESC, Q4_TXT, [t3, t4, t5], [a8], 'elephantCDE', new Date('2023-03-10T14:28:01'), 103);

    const u1_pwd = await bcrypt.hash('Rachelhomie@123', 10);
    const u2_pwd = await bcrypt.hash('Rosssandwich@123', 10);
    const u3_pwd = await bcrypt.hash('Jakebrooklyn@334', 10);
    const u4_pwd = await bcrypt.hash('AmyJamy@1002', 10);

    const u1 = await userCreate('Rachel', 'Green', 'rachelgreen', 'rach@gmail.com', u1_pwd, new Date('1990-01-20'));
    const u2 = await userCreate('Ross', 'Geller', 'rossgeller', 'ross12@gmail.com', u2_pwd, new Date('1989-12-20'));
    const u3 = await userCreate('Jake', 'Peralta', 'jakeperalta', 'jakep@gmail.com ', u3_pwd, new Date('1988-11-20'));
    const u4 = await userCreate('Amy', 'Santiago', 'amysantiago', 'amsan@gmail.com', u4_pwd, new Date('1987-10-20'));

    console.log('Users:', u1, u2, u3, u4);
    console.log('done');
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    db.close();
  }
};

populate();

console.log('processing ...');
