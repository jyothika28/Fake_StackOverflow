import "./tagPageView.css";
import Tag from "./tag/tagView";
import { useTagPage } from "../../../hooks/useTagPage";
import {
  VoidFunctionType,
  ClickTagFunctionType,
} from "../../../types/functionTypes";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";


interface TagPageProps {
  clickTag: ClickTagFunctionType;
  handleNewQuestion: VoidFunctionType;
}

const TagPage = ({ clickTag, handleNewQuestion }: TagPageProps) => {
  const { tlist } = useTagPage();

  return (
    <>
      <div className="space_between right_padding">
        <div className="bold_title">All Tags ({tlist.length})</div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
            handleNewQuestion();
          }}
          style={{marginRight: "20px"}}>
        Ask a Question
</Button>
        {/* <button className="bluebtn" onClick={handleNewQuestion}>
          Ask a Question
        </button> */}
      </div>
      
      <div className="tag_list right_padding">
        {tlist.map((t, idx) => (
          <Tag key={idx} t={t} clickTag={clickTag} />
        ))}
      </div>
    </>
  );
};

export default TagPage;
