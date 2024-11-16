import express, { Request, Response } from 'express';
import { saveAnswer, addAnswerToQuestion } from '../models/application';
import { IAnswer } from '../models/types/types';

const router = express.Router();

/**
 * Custom request type for adding an answer
 */
interface AddAnswerRequest extends Request {
  body: {
    qid: string;
    ans: IAnswer;
  };
}

/**
 * @route POST /answer/addAnswer
 * @description Add a new answer to a question
 * @body {AddAnswerRequest} - The answer data and question ID
 * @returns Newly created answer or error message
 */
router.post('/addAnswer', async (req: AddAnswerRequest, res: Response) => {
  const { qid, ans } = req.body;

  // Validate request body
  if (!qid || !ans || !ans.text || !ans.ans_by || !ans.ans_date_time) {
    return res.status(400).send('Invalid answer');
  }

  try {
    // Save the answer
    const savedAnswer = await saveAnswer(ans);

    // Check if there was an error while saving the answer
    if ('error' in savedAnswer) {
      return res.status(500).json({ error: 'Error saving answer' });
    }

    // Add the answer to the question
    const updatedQuestion = await addAnswerToQuestion(qid, savedAnswer);

    // Check if there was an error while updating the question
    if ('error' in updatedQuestion) {
      return res.status(500).json({ error: 'Error updating question with answer' });
    }

    res.status(200).json(savedAnswer);
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error adding answer:', error);
    }
    res.status(500).json({ error: 'Error adding answer' });
  }
});

export default router;
