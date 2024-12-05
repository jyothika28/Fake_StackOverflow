import "./sideBarNavView.css";
import { VoidFunctionType } from "../../../types/functionTypes";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, Typography } from "@mui/material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LabelIcon from '@mui/icons-material/Label';


interface SideBarNavProps {
  selected?: string;
  handleQuestions: VoidFunctionType;
  handleTags: VoidFunctionType;
}

const SideBarNav = ({
  selected = "",
  handleQuestions,
  handleTags,
}: SideBarNavProps) => {
  const drawerWidth = 220;
  return (
    <>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <Typography
          
          component="div"
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "black",
            textAlign: "center",
            margin:"2px",
            padding: "16px",
          }}
        >
          Fake Stack Overflow
        </Typography>
      
      <Divider />
      <List>
        {/* Questions Menu Item */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleQuestions}
            selected={selected === "q"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            <ListItemIcon>
              <QuestionAnswerIcon
                color={selected === "q" ? "inherit" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary="Questions" />
          </ListItemButton>
        </ListItem>

        {/* Tags Menu Item */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleTags}
            selected={selected === "t"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            <ListItemIcon>
              <LabelIcon color={selected === "t" ? "inherit" : "action"} />
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
    {/* <div id="sideBarNav" className="sideBarNav">
      <div
        id="menu_question"
        className={`menu_button ${selected === "q" ? "menu_selected" : ""}`}
        onClick={() => {
          handleQuestions();
        }}
      >
        Questions
      </div>
      <div
        id="menu_tag"
        className={`menu_button ${selected === "t" ? "menu_selected" : ""}`}
        onClick={() => {
          handleTags();
        }}
      >
        Tags
      </div>
    </div> */}
    </> 
  );
};

export default SideBarNav;
