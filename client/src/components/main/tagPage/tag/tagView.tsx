import "./tagView.css";
import { ClickTagFunctionType } from "../../../../types/functionTypes";
import { Card, CardContent, Typography} from "@mui/material";

interface TagProps {
  t: {
    name: string;
    qcnt: number;
  };
  clickTag: ClickTagFunctionType;
}


const Tag = ({ t, clickTag }: TagProps) => {
  return (
    // <div
    //   className="tagNode"
    //   onClick={() => {
    //     clickTag(t.name);
    //   }}
    // >
    //   <div className="tagName">{t.name}</div>
    //   <div>{t.qcnt} questions</div>
    // </div>
    <Card
    className="tagNode"
    sx={{
      cursor: "pointer",
      "&:hover": {
        boxShadow: 6,
        borderColor: "primary.main",
        
      },
     
    }}
    onClick={() => {
      clickTag(t.name);
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "bold", marginBottom: 1 }}
        className="tagName"
      >
        {t.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t.qcnt} questions
      </Typography>
    </CardContent>
  </Card>
  );
};

export default Tag;
