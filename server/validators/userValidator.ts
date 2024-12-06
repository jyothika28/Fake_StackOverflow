import { RegisterRequest,LoginRequest } from '../models/types/types'; 

export const validateRegisterRequest = (req: RegisterRequest) => {
  const { firstname, lastname, username, email, password } = req.body;
  let isValid = true;
  const errors: { [key: string]: string } = {};

  // Validate first name
  if (!firstname) {
    errors.firstname = "First name cannot be empty.";
    isValid = false;
  }

  // Validate last name
  if (!lastname) {
    errors.lastname = "Last name cannot be empty.";
    isValid = false;
  }

  // Validate username
  if (!username) {
    errors.username = "Username cannot be empty.";
    isValid = false;
  }

  // Validate email
  if (!email) {
    errors.email = "Email cannot be empty.";
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format. Please enter a valid email address.";
      isValid = false;
    }
  }

  // Validate password
  if (!password) {
    errors.password = "Password cannot be empty.";
    isValid = false;
  } else {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.password = "Password is too weak. Please ensure your password has at least 8 characters, one uppercase letter, and one special character.";
      isValid = false;
    }
  }

  return { isValid, errors };
};

export const validateLoginRequest = (req: LoginRequest) => {
    const { username, password } = req.body;
    let isValid = true;
    const errors: { [key: string]: string } = {};
  
    // Validate username
    if (!username) {
      errors.username = "Username cannot be empty.";
      isValid = false;
    }
  
    // Validate password
    if (!password) {
      errors.password = "Password cannot be empty.";
      isValid = false;
    } 
  
    return { isValid, errors };
  };