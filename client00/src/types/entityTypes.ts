interface AnswerType {
  text: string;
  ans_by: string;
  ans_date_time: Date;
}
interface AnswerResponseType {
  ans_by: string;
  ans_date_time: string;
  text: string;
  _id: string;
}

interface QuestionType {
  title: string;
  text: string;
  tags: Tag[];
  asked_by: string;
  ask_date_time: Date;
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
}

interface Tag {
  name: string;
}

interface TagResponseType {
  name: string;
  _id: string;
  qcnt: number;
}

export type {
  AnswerType,
  QuestionType,
  Question,
  Tag,
  AnswerResponseType,
  QuestionResponseType,
  TagResponseType,
};
