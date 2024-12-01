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
      setUsernameErr("Username cannot be empty");
      isValid = false;
    }
    // Validate password
    if (!password) {
      setPasswordErr("Password cannot be empty");
      isValid = false;
    }
    // If validation fails, return early
    if (!isValid) {
      return;
    }
    // Create user object
    const user = {
      username,
      password,
    };
    // Login user
    const res = await loginUser(user);
    if (res && res.success) {
      setIsLoggedIn(true);
    } else {
      setUsernameErr("Invalid username or password");
      setPasswordErr("Invalid username or password");
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
