import "./index.css";
import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { QuestionsPageQueryFuntionType } from "../../types/functionTypes";
import { logoutUser } from "../../services/userService";
import { AppBar, Toolbar, Typography,Box, Menu, MenuItem, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { VoidFunctionType } from "../../types/functionTypes";

interface HeaderProps {
  search: string;
  userProfilePage: VoidFunctionType;
  setQuestionPage: QuestionsPageQueryFuntionType;
  username: string;
  navigateToLogin: VoidFunctionType;
}

const Header = ({ search, userProfilePage, setQuestionPage,navigateToLogin }: HeaderProps) => {
  const [val, setVal] = useState<string>(search);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuestionPage(e.currentTarget.value, "Search Results");
    }
  };

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    userProfilePage();
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logoutUser();
    navigateToLogin();
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
            color: "white",
          }}
        >
          Fake Stack Overflow
        </Typography>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          value={val}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-bar"
        />

        {/* Profile Dropdown */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
   
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      onClick={handleMenuClick}
      id="profileBtn"
      
    >
      <AccountCircle />
    </IconButton>
    
  </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
