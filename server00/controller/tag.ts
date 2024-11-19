import express from "express";
import { getTagCountMap } from "../models/application";

const router: express.Router = express.Router();

/**
 * GET /getTagsWithQuestionNumber
 * Returns a list of tags with the number of questions associated with each tag in the database
 * @returns {Array<{ name: string, qcnt: number }>} List of tags with the number of questions associated with each tag
 */

router.get("/getTagsWithQuestionNumber", async (req, res) => {
  try {
    const tagCountMap = await getTagCountMap();

    if (tagCountMap instanceof Map) {
      // Convert Map entries to the desired format
      const tagList = Array.from(tagCountMap.entries()).map(([name, qcnt]) => ({
        name,
        qcnt,
      }));
      return res.status(200).json(tagList);
    } else {
      // If tagCountMap is an error object, handle it
      return res.status(500).json({ error: "Failed to retrieve tags" });
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "An error occurred while retrieving tags" });
  }
});

export default router;
