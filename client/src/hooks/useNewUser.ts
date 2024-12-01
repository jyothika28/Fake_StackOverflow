import { useState } from "react";
import { registerUser } from "../services/userService";

/**
 * Custom hook to manage user registration
 * @param setIsLoggedIn - Function to set the login state
 * @returns Object containing state variables and functions for user registration
 */
export const useNewUser = (callback: (isLoggedIn: boolean) => void) => {
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
      setFirstnameErr("First name cannot be empty");
      isValid = false;
    }
    // Validate last name
    if (!lastname) {
      setLastnameErr("Last name cannot be empty");
      isValid = false;
    }
    // Validate username
    if (!username) {
      setUsernameErr("Username cannot be empty");
      isValid = false;
    }

    // Validate email
    if (!email) {
      setEmailErr("Email cannot be empty");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailErr("Invalid email format");
        isValid = false;
      }
    }
    // Validate password
    if (!password) {
      setPasswordErr("Password cannot be empty");
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
    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordErr("Passwords do not match");
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
    const res = await registerUser(user);
    if (res && res.success) {
      callback(true);
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
