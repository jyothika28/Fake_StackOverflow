import "./index.css";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { QuestionsPageQueryFuntionType } from "../../types/functionTypes";
import { logoutUser } from "../../services/userService";
import { Button, TextField } from "@mui/material";
import {  Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  search: string;
  setQuestionPage: QuestionsPageQueryFuntionType;
}

const Header = ({ search, setQuestionPage }: HeaderProps) => {
  const [val, setVal] = useState<string>(search);

 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuestionPage(e.currentTarget.value, "Search Results");
    }
  };


  return (
    <div id="header" className="header">
      <div></div>
      <div className="title">Fake Stack Overflow</div>
      <input
        id="searchBar"
        placeholder="Search ..."
        type="text"
        value={val}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {/* <TextField
        id="searchBar"
        placeholder="Search ..."
        type="text"
        value={val}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      /> */}
      <Button
        color="inherit"
        startIcon={<LogoutIcon />}
      onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
