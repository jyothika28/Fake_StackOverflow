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
      throw new Error(res.data?.message || "Error during user login");
    }
    return res.data;
  }  catch (error: any) {
    console.error("Error during user login:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message); 
    } else {
      throw new Error("An unexpected error occurred during login");
    }
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
    const res = await api.post(`${USER_API_URL}/register`, userData);
    if (res.status !== 201) {
      throw new Error("Error during user registration");
    }
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

const logoutUser = async () => {
  
  try {
    console.log("In client logoutUser");
    const res = await api.post(`${USER_API_URL}/logout`);
    if (res.status !== 200) {
      throw new Error("Error during user logout");
    }
    console.log("In client logoutUser res", res);
    return res.data;
  } catch (error) {
    console.error("Error during user logout:", error);
    throw error;
  }
}

export { registerUser, loginUser,logoutUser };