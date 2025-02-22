import { useState } from "react";
import { registerUser } from "../services/userService";

/**
 * Custom hook to manage user registration
 * @param setIsLoggedIn - Function to set the login state
 * @returns Object containing state variables and functions for user registration
 */
export 
const useNewUser = (setIsLoggedIn: (isLoggedIn: boolean) => void, navigateToLogin: () => void) => {

  // State variables for form fields
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  // State variables for error messages
  const [firstnameErr, setFirstnameErr] = useState<string>("");
  const [lastnameErr, setLastnameErr] = useState<string>("");
  const [usernameErr, setUsernameErr] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<string>("");
  /**
   * Function to handle user registration
   */
  const handleRegister = async () => {
    let isValid = true;
    // Validate first name
    if (!firstname) {
      setFirstnameErr("First name cannot be empty.");
      isValid = false;
    }
    // Validate last name
    if (!lastname) {
      setLastnameErr("Last name cannot be empty.");
      isValid = false;
    }
    // Validate username
    if (!username) {
      setUsernameErr("Username cannot be empty.");
      isValid = false;
    }

    // Validate email
    if (!email) {
      setEmailErr("Email cannot be empty.");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailErr("Invalid email format. Please enter a valid email address.");
        isValid = false;
      }
    }
    // Validate password
    if (!password) {
      setPasswordErr("Password cannot be empty.");
      isValid = false;
    } else {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
      if (!passwordRegex.test(password)) {
        setPasswordErr(
          "Password is too weak. Please ensure your password has at least 8 characters, one uppercase letter, and one special character."
        );
        isValid = false;
      }
    }
    if(!confirmPassword){
      setConfirmPasswordErr("Confirm Password cannot be empty.");
      isValid = false;
    }
    // Validate confirm password
    else if (password !== confirmPassword) {
      setConfirmPasswordErr("Passwords do not match. Please ensure both password fields match exactly.");
      isValid = false;
    }
    // If validation fails, return
    if (!isValid) {
      return;
    }

    const user = {
      firstname,
      lastname,
      username,
      email,
      password,
      dob,
    };
    console.log("user", user);
    //Register user
    try {
      const res = await registerUser(user);
      if (res && res.success) {
        navigateToLogin();
      }
    } catch (error: any) {
      console.log("error in registerUser", error);  
      if (error.message.includes("email")) {
        setEmailErr(error.message);
      } else if (error.message.includes("username")) {
        setUsernameErr(error.message);
      } else {
        console.error("Unexpected error during registration:", error);
      }
    }
    
  };

  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    dob,
    setDob,
    firstnameErr,
    lastnameErr,
    usernameErr,
    emailErr,
    passwordErr,
    confirmPasswordErr,
    handleRegister,
  };
};

export default useNewUser;
