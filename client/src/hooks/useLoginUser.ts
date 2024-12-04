import { useState } from "react";
import { loginUser } from "../services/userService";

/**
 * Custom hook to manage user login
 * @param setIsLoggedIn - Function to set the login state
 * @returns Object containing state variables and functions for user login
 */
export const useLoginUser = (setIsLoggedIn: (isLoggedIn: boolean) => void) => {
  // State variables for form fields
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // State variables for error messages
  const [usernameErr, setUsernameErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");

  /**
   * Function to handle user login
   */
  const handleLogin = async () => {
    let isValid = true;
    // Validate username
    if (!username) {
      setUsernameErr("Username cannot be empty.");
      isValid = false;
    }
    // Validate password
    if (!password) {
      setPasswordErr("Password cannot be empty.");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    try {
      // Create user object
      const user = {
        username,
        password,
      };
  
      const res = await loginUser(user);
  
      if (res && res.success) {
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.error("Error during login:", error);
  
      if (error.message.includes("No account found")) {
        setUsernameErr("No account found with this username. Please register or try again.");
      } else if (error.message.includes("Invalid credentials")) {
        setPasswordErr("Invalid credentials. Please try again.");
      } 
      else {
        setUsernameErr("An unexpected error occurred during login");
      }
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    usernameErr,
    passwordErr,
    handleLogin,
  };
};

export default useLoginUser;
