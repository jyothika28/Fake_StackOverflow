interface UserRegistrationData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  dob?: string;
}

interface UserRegistrationResponse {
  success: boolean;
  message: string;
}
interface UserLoginData {
  username: string;
  password: string;
}

interface UserLoginResponse {
  success: boolean;
  message: string;
}
interface CommentType {
  _id: string;
  text: string;
  commented_by: string;
  comment_date_time: Date;
  upvotes: number;
  downvotes: number;
  flagged: boolean;
}

interface AnswerType {
  _id?: string;
  text: string;
  ans_by: string;
  ans_date_time: Date;
  comments?: CommentType[]; // Add `comments`
}

interface AnswerResponseType {
  _id: string; // Add `_id`
  text: string;
  ans_by: string;
  ans_date_time: string;
  comments?: CommentType[]; // Add `comments`
}

interface QuestionType {
  title: string;
  text: string;
  tags: Tag[];
  asked_by: string;
  ask_date_time: Date;
  upvotes: number;
  downvotes: number;
  flagged: boolean;
}

interface QuestionResponseType {
  _id: string;
  answers: AnswerType[];
  views: number;
  title: string;
  tags: { name: string }[];
  asked_by: string;
  ask_date_time: string;
  text: string;
  upvotes: number;
  downvotes: number;
  flagged: boolean;
}

interface Question {
  answers: {
    text: string;
    ans_by: string;
    ans_date_time: string;
  }[];
  title: string;
  views: number;
  text: string;
  asked_by: string;
  ask_date_time: string;
  upvotes: number;
  downvotes: number;
  flagged: boolean;
}

interface Tag {
  name: string;
}

interface TagResponseType {
  name: string;
  _id: string;
  qcnt: number;
}

interface RegistrationProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  navigateToLogin: () => void;
}

export type {
  RegistrationProps,
  UserRegistrationData,
  UserRegistrationResponse,
  UserLoginData,
  UserLoginResponse,
  AnswerType,
  QuestionType,
  Question,
  Tag,
  AnswerResponseType,
  QuestionResponseType,
  TagResponseType,
  CommentType,
};
