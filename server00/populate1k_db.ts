// Run this script to test your schema
// Start the mongoDB service as a background process before running the script
// Pass the URL of your mongoDB instance as the first argument (e.g., mongodb://127.0.0.1:27017/fake_so)

import mongoose from 'mongoose';

import Answer from './models/answers';
import Question from './models/questions';
import Tag from './models/tags';
import { ITag, IAnswer, IQuestion } from './models/types/types';

const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
  console.log('ERROR: You need to specify a valid MongoDB URL as the first argument');
  process.exit(1);
}

const mongoDB = userArgs[0];

mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const datesList: string[] = [
  '2020-01-15T12:00:00', '2020-02-20T15:30:00', '2020-03-25T10:45:00',
  '2020-04-10T09:20:00', '2020-05-05T13:10:00', '2020-06-15T11:15:00',
  '2020-07-30T16:25:00', '2020-08-12T08:35:00', '2020-09-14T14:40:00',
  '2020-10-11T17:50:00', '2020-11-08T19:00:00', '2020-12-03T20:05:00',
  '2021-01-17T12:30:00', '2021-02-24T15:45:00', '2021-03-11T10:55:00',
  '2021-04-22T09:10:00', '2021-05-19T13:20:00', '2021-06-30T11:30:00',
  '2021-07-15T16:40:00', '2022-01-05T18:00:00', '2022-03-10T14:10:00',
];

const ansDatesList: string[] = [
  '2023-01-15T12:00:00', '2023-02-20T15:30:00', '2023-03-25T10:45:00',
  '2023-04-10T09:20:00', '2023-05-05T13:10:00', '2023-06-15T11:15:00',
  '2023-07-30T16:25:00', '2023-08-12T08:35:00', '2023-09-14T14:40:00',
  '2023-10-11T17:50:00', '2023-11-08T19:00:00', '2023-12-03T20:05:00',
  '2023-01-17T12:30:00', '2023-02-24T15:45:00', '2023-03-11T10:55:00',
  '2023-04-22T09:10:00', '2023-05-19T13:20:00', '2023-06-30T11:30:00',
  '2023-07-15T16:40:00', '2023-01-05T18:00:00', '2023-03-10T14:10:00',
];

const ansDates24List: string[] = [
  '2024-01-15T12:00:00', '2024-02-20T15:30:00', '2024-03-25T10:45:00',
  '2024-04-10T09:20:00', '2024-05-05T13:10:00', '2024-06-15T11:15:00',
  '2024-07-30T16:25:00', '2024-08-12T08:35:00', '2024-09-14T14:40:00',
  '2024-02-11T17:50:00', '2024-03-08T19:00:00', '2024-02-03T20:05:00',
  '2024-01-17T12:30:00', '2024-02-24T15:45:00', '2024-03-11T10:55:00',
  '2024-04-22T09:10:00', '2024-05-19T13:20:00', '2024-06-30T11:30:00',
  '2024-07-15T16:40:00', '2024-01-05T18:00:00', '2024-03-10T14:10:00',
];

const usernames: string[] = [
  'user1', 'user2', 'user3', 'user4', 'user5', 
  'user6', 'user7', 'user8', 'user9', 'user0'
];

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const formatTextWithNewLines = (text: string, maxLength: number): string => {
  return text.match(new RegExp(`.{1,${maxLength}}`, 'g'))?.join('\n') || text;
};

function tagCreate(name: string): Promise<ITag> {
  const tag = new Tag({ name });
  return tag.save();
}

function answerCreate(text: string, ans_by: string, ans_date_time: Date): Promise<IAnswer> {
  const answerDetail: IAnswer = { text, ans_by, ans_date_time };
  const answer = new Answer(answerDetail);
  return answer.save();
}

function questionCreate(title: string, text: string, tags: ITag[], answers: IAnswer[], asked_by: string, ask_date_time: Date, views: number): Promise<IQuestion> {
  const qstnDetail: IQuestion = { title, text, tags, answers, asked_by, ask_date_time, views };
  if (ask_date_time) qstnDetail.ask_date_time = ask_date_time;
  if (views) qstnDetail.views = views;

  const qstn = new Question(qstnDetail);
  return qstn.save();
}

const populate = async () => {
  const tags: ITag[] = [];
  for (let i = 0; i < 10; i++) {
    const tagName = `tag${i + 1}`; // Generate unique tag names (tag1, tag2, ...)
    tags.push(await tagCreate(tagName));
  }

  try {
    for (let i = 0; i < 1000; i++) {
      const title = `Question Title ${i + 1}`; // Unique title for each question
      const text = formatTextWithNewLines(`This is the body of question number ${i + 1}. It contains detailed information about the question being asked. Let's make it long enough to require splitting into multiple lines as per the rules. ` + 'X'.repeat(500), 30);
      const questionDate = datesList[randomInt(0, 19)]; // Random date from the list
      const questionTags = tags.slice(randomInt(1, 5)).slice(0, randomInt(1, 5)); // Randomly select 1 to 5 tags from the available tags
      const asked_by = usernames[randomInt(0, usernames.length - 1)];
      const views = randomInt(1, 100);

      const answers: IAnswer[] = [];
      // Add answers to 990 questions
      if (i < 990) {
        for (let j = 0; j < 50; j++) {
          const answerText = formatTextWithNewLines(`This is answer ${j + 1} for question ${i + 1}. It provides a detailed response to the question posed. ` + 'Y'.repeat(500), 30);
          let answerDate;
          if(i % 2 === 0) {
            answerDate = new Date(ansDatesList[randomInt(0, 19)]); // Random date for answer, picked from the same list
          }
          else {
            answerDate = new Date(ansDates24List[randomInt(0, 19)]);
          }
          answers.push(await answerCreate(answerText, usernames[randomInt(0, usernames.length - 1)], answerDate));
        }
      }

      await questionCreate(title, text, questionTags, answers, asked_by, new Date(questionDate), views);
    }

    console.log('Database populated with 1000 questions and their respective answers.');
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    db.close();
  }
};

populate();

console.log('Processing ...');
