import express from "express";
import {
  getQuestionsByOrder,
  filterQuestionsBySearch,
  fetchAndIncrementQuestionViewsById,
  //getTagIds,
  saveQuestion,
  SortOrder,
} from "../models/application";
import {
  // IQuestion,
  // GetQuestionsByFilterRequest,
  GetQuestionByIdRequest,
  IQuestion,
  AddQuestionRequest,
  // QuestionAPIResponse,
} from "../models/types/types";
import { flagQuestionById } from "../models/questions";

const router = express.Router();

router.get(
  "/getQuestionById/:qid",
  async (req: GetQuestionByIdRequest, res) => {
    try {
      const question = await fetchAndIncrementQuestionViewsById(req.params.qid);
      
      if (question && !("error" in question)) {
        return res.status(200).json(question);
      } else {
        return res
          .status(500)
          .json({ error: "Error when fetching and updating a question" });
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      res
        .status(500)
        .json({ error: "Error when fetching and updating a question" });
    }
  }
);

router.get("/getQuestion", async (req: GetQuestionByIdRequest, res) => {
  try {
    const { order, search } = req.query;
    let questions;
    // order consists of newest, active, unanswered
    if (
      order &&
      !["active", "newest", "unanswered"].includes(order as string)
    ) {
      return res.status(500).json({ error: "Invalid order parameter" });
    }

    if (order && typeof search === "string") {
      // If both order and search are provided, filter the questions
      questions = await filterQuestionsBySearch(
        await getQuestionsByOrder(order as SortOrder),
        search as string
      );
    } else {
      // Otherwise, just get questions by order
      questions = await getQuestionsByOrder(order as SortOrder);
    }
    return res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Error fetching questions" });
  }
});

/**
 * Endpoint to add a new question to the database.
 *
 * @route POST /addQuestion
 * @param {AddQuestionRequest} req - The request object, containing the question details in the body.
 * @param {Response} res - The response object used to send back the HTTP response.
 * @returns {Promise<Response>} - Returns a success response with the saved question or an error response.
 *
 * @throws {Error} - Throws an error if there is a database issue or if the question details are invalid.
 */
router.post("/addQuestion", async (req: AddQuestionRequest, res) => {
  const { title, text, tags, asked_by, ask_date_time } = req.body;

  // Validation for missing or invalid fields
  if (
    !title ||
    typeof title !== "string" ||
    title.trim() === "" ||
    !text ||
    typeof text !== "string" ||
    text.trim() === "" ||
    !tags ||
    !Array.isArray(tags) ||
    tags.length === 0 ||
    !asked_by ||
    typeof asked_by !== "string" ||
    asked_by.trim() === "" ||
    !ask_date_time ||
    !(ask_date_time instanceof Date || typeof ask_date_time === "string")
  ) {
    return res.status(400).send("Invalid question body");
  }
  // Save question to the database
  try {
    const question: IQuestion = {
      title,
      text,
      tags,
      answers: [],
      asked_by,
      ask_date_time: new Date(ask_date_time),
      views: 0,
    };
    const savedQuestion = await saveQuestion(question);
    if ("error" in savedQuestion || saveQuestion === undefined) {
      return res.status(500).json({ error: "Error while saving question" });
    }
    return res.status(200).json(savedQuestion);
  } catch (error) {
    console.error("Error saving question:", error);
    return res.status(500).json({ error: "Database error" });
  }
});

router.post("/flagQuestion/:qid", async (req: GetQuestionByIdRequest, res) => {
  console.log("Endpoint hit with QID:", req.params.qid);

  try {
    const { qid } = req.params;
    const flaggedQuestion = await flagQuestionById(qid);

    if (!flaggedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    console.log("Flagged Question:", flaggedQuestion);
    return res
        .status(200)
        .json({ message: "This post has been flagged for review.", flaggedQuestion });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in flagging:", error.message);
      if (error.message === "Question not found") {
        return res.status(404).json({ error: error.message });
      }
    } else {
      console.error("Unknown error in flagging:", error);
    }
    return res.status(500).json({ error: "Error flagging question" });
  }
});



export default router;
