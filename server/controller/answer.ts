import express, { Response } from "express";
import { saveAnswer, addAnswerToQuestion } from "../models/application";
import {
  IAnswer,
  AddAnswerRequest,
  AddAnswerResponse,
} from "../models/types/types";
import Answer from "../models/answers";

const router = express.Router();

/**
 * POST /answer/addAnswer
 * @param {AddAnswerRequest} req - The request object containing the answer data.
 * @param {Response} res - The response object.
 */

router.post("/addAnswer", async (req: AddAnswerRequest, res: Response) => {
  try {
    // Extract answer data from request body
    const { qid, ans } = req.body;
    if (!qid || !ans || !ans.ans_by || !ans.ans_date_time || !ans.text) {
      return res.status(400).send("Invalid answer");
    }
    // Save answer to the database
    const answer = await saveAnswer(ans);
    // Check if there was an error saving the answer
    if (answer instanceof Error) {
      console.error("Error saving answer:", answer);
      return res.status(500).json({ error: "Database error" });
    }

    // Attempt to add answer to the corresponding question
    const updatedQuestion = await addAnswerToQuestion(qid, ans);
    // Check if there was an error updating the question
    // Here we check if updatedQuestion contains an error message
    if (updatedQuestion === undefined) {
      return res.status(500).json({ error: "Database error" });
    }

    // Respond with success 
    res.status(200).json({
      ans_by: ans.ans_by,
      ans_date_time: ans.ans_date_time,
      text: ans.text,
      _id: (answer as IAnswer)._id,
    } as unknown as AddAnswerResponse);
  } catch (error) {
    console.error("Error in /addAnswer:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
});

router.post("/flagAnswer/:aid", async (req, res) => {

  try {
    const { aid } = req.params;

    console.log(`Attempting to flag answer with ID: ${aid}`);

    // Update the answer's flagged status in the database
    const flaggedAnswer = await Answer.findByIdAndUpdate(
        aid,
        { flagged: true },
        { new: true } // Return the updated document
    );

    // Handle case where the answer does not exist
    if (!flaggedAnswer) {
      console.warn(`Answer with ID ${aid} not found`);
      return res.status(404).json({ error: "Answer not found" });
    }

    // Success response
    console.log("Answer successfully flagged:", flaggedAnswer);
    return res.status(200).json({
      message: "This answer has been flagged for review.",
      flaggedAnswer,
    });
  } catch (error) {
    // Improved error logging
    if (error instanceof Error) {
      console.error("Error flagging answer:", error.message);
    } else {
      console.error("Unexpected error occurred during flagging:", error);
    }

    // Internal server error response
    return res.status(500).json({ error: "Error flagging answer" });
  }
});


export default router;
