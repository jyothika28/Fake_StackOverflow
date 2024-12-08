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

export const flagComment = async (answerId: string, commentId: string) => {
    console.log("commentService flagComment:", answerId, commentId);
    console.log("commentService flagComment:", `${COMMENT_API_URL}/answer/${answerId}/comment/${commentId}/flagComment`);
    const response = await api.post(`${COMMENT_API_URL}/answer/${answerId}/comment/${commentId}/flagComment`);
    console.log("commentService flagComment:", response.data.message);
    if (response.status !== 200) {
        throw new Error("Error flagging the comment");
    }
    return response.data;
};
