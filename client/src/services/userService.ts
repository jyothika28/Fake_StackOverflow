import { REACT_APP_API_URL, api } from "./config";
import {
  UserLoginData,
  UserLoginResponse,
  UserRegistrationData,
  UserRegistrationResponse,
} from "../types/entityTypes";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

/**
 * Function to login a user
 * @param userData  UserLoginData object
 * @returns the response from the server
 */
const loginUser = async (
  userData: UserLoginData
): Promise<UserLoginResponse> => {
  try {
    const res = await api.post(`${USER_API_URL}/login`, userData);

    if (res.status !== 200) {
      throw new Error("Error during user login");
    }
    return res.data;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};

/**
 * Function to register a user
 * @param userData user registration data object
 * @returns the response from the server
 */
const registerUser = async (
  userData: UserRegistrationData
): Promise<UserRegistrationResponse> => {
  try {
    console.log("USERAPI", USER_API_URL);
    const res = await api.post(`${USER_API_URL}/register`, userData);
    if (res.status !== 201) {
      throw new Error("Error during user registration");
    }
    return res.data;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export { registerUser, loginUser };