import "./questionView.css";
import { getMetaData } from "../../../../tool";
import {
  ClickTagFunctionType,
  IdFunctionType,
} from "../../../../types/functionTypes";
import { Tag, AnswerType } from "../../../../types/entityTypes";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface QuestionProps {
  q: {
    _id: string;
    answers: AnswerType[];
    views: number;
    title: string;
    tags: Tag[];
    asked_by: string;
    ask_date_time: string;
  };
  clickTag: ClickTagFunctionType;
  handleAnswer: IdFunctionType;
}

const Question = ({ q, clickTag, handleAnswer }: QuestionProps) => {
  const style = {
    p: 0,
    width: '100%',
    maxWidth: 1000,
    borderRadius: 2,
    Margin: 1,
    border: '2px solid black',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };
  
  return (
    <div
      className="question right_padding"
      onClick={() => {
        handleAnswer(q._id);
      }}
    >
         {/* <List sx={style} aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary="Inbox" />
      </ListItem>
    </List>
      <div className="postStats">
        <div>{q.answers.length || 0} answers</div>
        <div>{q.views} views</div>
      </div>
      <div className="question_mid">
        <div className="postTitle">{q.title}</div>
        <div className="question_tags">
          {q.tags.map((tag, idx) => {
            return (
              <button
                key={idx}
                className="question_tag_button"
                onClick={(e) => {
                  e.stopPropagation();
                  clickTag(tag.name);
                }}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="lastActivity">
        <div className="question_author">{q.asked_by}</div>
        <div>&nbsp;</div>
        <div className="question_meta">
          asked {getMetaData(new Date(q.ask_date_time))}
        </div>
      </div> */}
       <List sx={style} aria-label="question list">
       <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 1 }}>
        {/* Post Stats Section (Column 1) */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }} className="postStats">
      <div>{q.answers.length || 0} answers</div>
      <div>{q.views} views</div>
    </Box>

    {/* Question Title and Tags (Column 2) */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
      <div className="postTitle">{q.title}</div>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {q.tags.map((tag, idx) => (
          <Button
            key={idx}
            size="small"
            className="question_tag_button"
            variant="outlined"
            sx={{ margin: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              clickTag(tag.name);
            }}
          >
            {tag.name}
          </Button>
        ))}
      </Box>
    </Box>

    {/* Question Author and Meta Data (Column 3) */}
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
      <div className="question_author">{q.asked_by}</div>
      <div className="question_meta">asked {getMetaData(new Date(q.ask_date_time))}</div>
    </Box>
      </ListItem>
    </List>
    </div>
  );
};

export default Question;
