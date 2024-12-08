import {api, REACT_APP_API_URL} from "./config";


const COMMENT_API_URL = `${REACT_APP_API_URL}/comment`;

export const getCommentsForAnswer = async (answerId: string) => {
    try {
        const res = await api.get(`${COMMENT_API_URL}/answer/${answerId}/comments`);
        return res.data.comments
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};
