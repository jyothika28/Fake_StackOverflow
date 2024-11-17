import { REACT_APP_API_URL, api } from "./config";
import { TagResponseType } from "../types/entityTypes";

const TAG_API_URL = `${REACT_APP_API_URL}/tag`;

// Function to get tags with question number
const getTagsWithQuestionNumber = async (): Promise<TagResponseType[]> => {
  try {
    const res = await api.get(`${TAG_API_URL}/getTagsWithQuestionNumber`);
    if (res.status !== 200) {
      throw new Error("Error when fetching tags with question number");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export { getTagsWithQuestionNumber };
