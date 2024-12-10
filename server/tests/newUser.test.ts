import supertest from "supertest";
import mongoose from "mongoose";
import {getUserByUsername, insertNewUser} from "../models/application";
import { Server } from "http";

jest.mock("../models/application", () => ({
  insertNewUser: jest.fn(),
  getUserByUsername: jest.fn(),
}));

let server: Server;

describe("POST /register", () => {
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    jest.resetAllMocks();
    server.close();
    await mongoose.disconnect();
  });

  it("should add a new user", async () => {
    // Mock request body
    const mockUser = {
      firstname: "New",
      lastname: "User",
      username: "new_user",
      email: "new_user@gmail.com",
      password: "Password@100",
      dob: new Date("2024-06-06").toISOString(),
    };
    (insertNewUser as jest.Mock).mockResolvedValueOnce(mockUser);

    // Making the request
    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: "User registered successfully",
      user: mockUser,
    });
  });
  it("should return validation errors if First name is empty", async () => {
    const mockUser = {
      firstname: "",
      lastname: "lastname",
      username: "lastfirst",
      email: "Invalidemail@gmail.com",
      password: "Weakpassword@100",
      dob: new Date("2024-06-06").toISOString(),
    };

    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: {
        firstname: "First name cannot be empty.",
      },
    });
  });

  it("should return validation errors if Last name is empty", async () => {
    const mockUser = {
      firstname: "firstname",
      lastname: "",
      username: "lastfirst",
      email: "Invalidemail@gmail.com",
      password: "Weakpassword@100",
      dob: new Date("2024-06-06").toISOString(),
    };

    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: {
        lastname: "Last name cannot be empty.",
      },
    });
  });

  it("should return validation errors if the username is empty", async () => {
    const mockUser = {
      firstname: "firstname",
      lastname: "lastname",
      username: "",
      email: "Invalidemail@gmail.com",
      password: "Weakpassword@100",
      dob: new Date("2024-06-06").toISOString(),
    };

    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: {
        username: "Username cannot be empty.",
      },
    });
  });
  it("should return validation errors if email address is empty", async () => {
    const mockUser = {
      firstname: "firstname",
      lastname: "lastname",
      username: "lastfirst",
      email: "",
      password: "Password@100",
      dob: new Date("2024-06-06").toISOString(),
    };

    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: {
        email: "Email cannot be empty.",
      },
    });
  });

  it("should return validation errors if password is empty", async () => {
    const mockUser = {
      firstname: "firstname",
      lastname: "lastname",
      username: "lastfirst",
      email: "EmailPass@gmail.com",
      password: "",
      dob: new Date("2024-06-06").toISOString(),
    };

    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: {
        password: "Password cannot be empty.",
      },
    });
  });


  it("should return validation errors if input data is invalid", async () => {
    const mockUser = {
      firstname: "",
      lastname: "",
      username: "",
      email: "invalid-email",
      password: "weakpassword",
      dob: new Date("2024-06-06").toISOString(),
    };

    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: {
        firstname: "First name cannot be empty.",
        lastname: "Last name cannot be empty.",
        username: "Username cannot be empty.",
        email: "Invalid email format. Please enter a valid email address.",
        password:
          "Password is too weak. Please ensure your password has at least 8 characters, one uppercase letter, and one special character.",
      },
    });
  });
  it("should return validation errors if Password doesnot meet the strength criteria", async () => {
    const mockUser = {
      firstname: "firstname",
      lastname: "lastname",
      username: "lastfirst",
      email: "Invalidemail@gmail.com",
      password: "password100",
      dob: new Date("2024-06-06").toISOString(),
    };

    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: {
        password:
          "Password is too weak. Please ensure your password has at least 8 characters, one uppercase letter, and one special character.",
      },
    });
  });

  it("should return validation errors if email address doesnot meet the criteria", async () => {
    const mockUser = {
      firstname: "firstname",
      lastname: "lastname",
      username: "lastfirst",
      email: "Invalidemailgmail.com",
      password: "Password@100",
      dob: new Date("2024-06-06").toISOString(),
    };

    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: {
        email: "Invalid email format. Please enter a valid email address.",
      },
    });
  });

 
  it("should add a new user with empty date of birth", async () => {
    // Mock request body
    const mockUser = {
      firstname: "New",
      lastname: "User",
      username: "new_user",
      email: "new_user@gmail.com",
      password: "Password@100",
    };
    (insertNewUser as jest.Mock).mockResolvedValueOnce(mockUser);

    // Making the request
    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: "User registered successfully",
      user: mockUser,
    });
  });
  
  it("should return 500 if an error occurs during registration", async () => {
    // Mock request body
    const mockUser = {
      firstname: "New",
      lastname: "User",
      username: "new_user",
      email: "new_user@gmail.com",
      password: "Password@100",
      dob: new Date("2024-06-06").toISOString(),
    };

    // Mock insertNewUser to throw an error
    (insertNewUser as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    // Making the request
    const response = await supertest(server)
      .post("/user/register")
      .send(mockUser);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: "Database error",
    });
  });

});

describe("GET /getUser", () => {
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    jest.clearAllMocks();
    server.close();
    await mongoose.disconnect();
  });

  it("should return 400 if username is not present in session", async () => {
    const response = await supertest(server).get("/user/getUser").send();

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Username is required" });
  });
});
