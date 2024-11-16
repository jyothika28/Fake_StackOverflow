import express, { Request, Response } from 'express';
import {
  getQuestionsByOrder,
  filterQuestionsBySearch,
  fetchAndIncrementQuestionViewsById,
  saveQuestion,
  getTagIds
} from '../models/application';
import { GetQuestionsByFilterRequest, IQuestion, ITag } from '../models/types/types';

const router = express.Router();

/**
 * @route GET /question/getQuestion
 * @description Retrieve questions based on sorting order and search criteria.
 * @query order - Sorting order ('active', 'newest', 'unanswered')
 * @query search - Search term to filter questions
 * @returns List of questions based on sorting order and search criteria.
 */
router.get('/getQuestion', async (req: GetQuestionsByFilterRequest, res: Response) => {
  const { order, search } = req.query;

  try {
    const questions = await getQuestionsByOrder(
        (order as 'active' | 'newest' | 'unanswered') || 'newest'
    );

    // Filter questions if the search term is provided
    if (search) {
      const filteredQuestions = filterQuestionsBySearch(questions, search);
      return res.status(200).json(filteredQuestions);
    }

    // Return questions if no search is provided
    res.status(200).json(questions);
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error fetching or filtering questions:', error);
    }
    res.status(500).json({ error: 'Error fetching or filtering questions' });
  }
});

/**
 * @route POST /question/addQuestion
 * @description Create a new question.
 * @body {IQuestion} - Question data to be created.
 * @returns Newly created question or error message.
 */
router.post('/addQuestion', async (req: Request, res: Response) => {
  const { title, text, tags, asked_by, ask_date_time }: IQuestion = req.body;

  // Validate request body
  if (
      !title || typeof title !== 'string' || title.trim() === '' ||
      !text || typeof text !== 'string' || text.trim() === '' ||
      !Array.isArray(tags) || tags.length === 0 ||
      !asked_by || typeof asked_by !== 'string' || asked_by.trim() === '' ||
      !ask_date_time || isNaN(new Date(ask_date_time).getTime())
  ) {
    return res.status(400).send('Invalid question body');
  }

  try {
    // Get tag IDs from the provided tag names
    const tagIds = await getTagIds(tags.map(tag => (tag as ITag).name));
    if (tagIds.length === 0) {
      return res.status(500).json({ error: 'Error retrieving tag IDs' });
    }

    // Prepare the question data with the required fields
    const questionData: IQuestion = {
      title,
      text,
      tags: tagIds,
      asked_by,
      ask_date_time: new Date(ask_date_time),
      answers: [],  // Initialize as empty array
      views: 0      // Initialize as 0
    };

    const savedQuestion = await saveQuestion(questionData);

    // Check if there was an error while saving the question
    if ('error' in savedQuestion) {
      return res.status(500).json({ error: savedQuestion.error });
    }

    res.status(200).json({
      ...savedQuestion,
      _id: savedQuestion._id?.toString(),
      ask_date_time: savedQuestion.ask_date_time.toISOString(),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error adding question:', error);
    }
    res.status(500).json({ error: 'Error adding question' });
  }
});

/**
 * @route GET /question/getQuestionById/:qid
 * @description Fetch a question by ID and increment its view count.
 * @param {string} qid - Question ID.
 * @returns Question data with incremented view count or error message.
 */
router.get('/getQuestionById/:qid', async (req: Request, res: Response) => {
  const { qid } = req.params;

  try {
    const question = await fetchAndIncrementQuestionViewsById(qid);

    // Check if the question is not found
    if (!question) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Question not found');
      }
      return res.status(500).json({ error: 'Question not found' });
    }

    // Check if there is an error in fetching
    if ('error' in question) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Error fetching question:', question.error);
      }
      return res.status(500).json({ error: question.error });
    }

    res.status(200).json(question);
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error fetching question by ID:', error);
    }
    res.status(500).json({ error: 'Error fetching question' });
  }
});

/**
 * @route POST /question/filter
 * @description Filter questions based on search string.
 * @body {GetQuestionsByFilterRequest} - Search criteria for filtering.
 * @returns List of filtered questions.
 */
router.post('/filter', async (req: Request, res: Response) => {
  const { search } = req.body as GetQuestionsByFilterRequest['query'];

  try {
    const questions = await getQuestionsByOrder('newest');
    const filteredQuestions = filterQuestionsBySearch(questions, search || '');
    res.status(200).json(filteredQuestions);
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error filtering questions:', error);
    }
    res.status(500).json({ error: 'Error filtering questions' });
  }
});

export default router;
