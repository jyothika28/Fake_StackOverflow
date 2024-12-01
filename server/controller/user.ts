import express from "express";
import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from "bcrypt";

const router: express.Router = express.Router();

/**
 * Register a new user
 * @route POST /user/register
 * @group User - Operations about user
 * @param {string} firstname.body.required - First name of the user
 * @param {string} lastname.body.required - Last name of the user
 * @param {string} username.body.required - Username of the user
 * @param {string} email.body.required - Email of the user
 * @param {string} password.body.required - Password of the user
 * @param {Date} dob.body - Date of birth of the user
 */

router.post('/register', async (req: Request, res: Response) => {
    const { firstname, lastname, username, email, password, dob } = req.body;
    console.log("req.body",req.body);
    try {
      // Check if the email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email or username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        dob,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ success: false, message: 'An error occurred during registration' });
    }
  });

/**
 * Login a user
 * @route POST /user/login
 * @group User - Operations about user
 * @param {string} username.body.required - Username of the user
 * @param {string} password.body.required - Password of the user
 * @returns {object} 200 - User logged in successfully
 * @returns {object} 400 - Invalid username or password
*/

router.post('/login', async (req: Request, res: Response) => {
    console.log("req.body in login",req.body);
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      console.log("user",user);
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("ismatch",isMatch);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }
  
      // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ success: true, message: 'User logged in successfully' /*, token */ });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
  });
export default router;