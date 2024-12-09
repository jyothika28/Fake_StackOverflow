import express from "express";
import { Request, Response } from "express";
import { getUserByUsername,insertNewUser,authenticateUser,logoutUser } from "../models/application";
import { LoginRequest,RegisterRequest } from "../models/types/types";
import { validateRegisterRequest,validateLoginRequest } from "../validators/userValidator";
import { body } from "express-validator";

const router: express.Router = express.Router();

/**
 * Register a new user
 * @route POST /register
 * @group User - Operations about user
 * @param {string} firstname.body.required - First name of the user
 * @param {string} lastname.body.required - Last name of the user
 * @param {string} username.body.required - Username of the user
 * @param {string} email.body.required - Email of the user
 * @param {string} password.body.required - Password of the user
 * @param {Date} dob.body - Date of birth of the user
 */
//Refactored code for register
// router.post('/register', async (req: RegisterRequest, res: Response) => {
//   const { firstname, lastname, username, email, password, dob } = req.body;

//   const { isValid, errors } = validateRegisterRequest(req);
//   if (!isValid) {
//     return res.status(400).json({ success: false, errors });
//   }
//   console.log('req.body', req.body);
//   try {
//     // Insert the new user into the database
//     const newUser = await insertNewUser({ firstname, lastname, username, email, password, dob });
//     res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     const errorMessage = (error as Error).message;
//     res.status(500).json({ success: false, message: errorMessage });
//   }
// });

// Middleware to sanitize inputs
router.post(
  '/register',
  [
    // Validation and sanitization middleware
    body('firstname').trim().escape().notEmpty().withMessage('First name is required'),
    body('lastname').trim().escape().notEmpty().withMessage('Last name is required'),
    body('username').trim().escape().notEmpty().withMessage('Username must be 3-20 characters long and contain only letters, numbers, or underscores')
  ],
  async (req: RegisterRequest, res: Response) => {

    // console.log('unsanitized register', req.body);
    // Validate the input
    
    // Extract sanitized input
    const { firstname, lastname, username, email, password, dob } = req.body;
    const { isValid, errors } = validateRegisterRequest(req);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }
    try {
      // Insert the new user into the database
      const newUser = await insertNewUser({ firstname, lastname, username, email, password, dob });
      res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage = (error as Error).message;
      res.status(500).json({ success: false, message: errorMessage });
    }
  }
);


/**
 * Login a user
 * @route POST /user/login
 * @group User - Operations about user
 * @param {string} username.body.required - Username of the user
 * @param {string} password.body.required - Password of the user
 * @returns {object} 200 - User logged in successfully
 * @returns {object} 400 - Invalid username or password
*/


/**
 * Login a user
 * @route POST /login
 * @group User - Operations about user
 * @param {string} username.body.required - Username of the user
 * @param {string} password.body.required - Password of the user
 */
// Refactored code for login
// router.post('/login', async (req: LoginRequest, res: Response) => {
//   console.log("req.body in login", req.body);
//   const { username, password } = req.body;
//   const { isValid, errors } = validateLoginRequest(req);
//   if (!isValid) {
//     return res.status(400).json({ success: false, errors });
//   }
//   try {
//     // Authenticate the user
//     const user = await authenticateUser(username, password);
//     req.session.user = user.username;
//     res.status(200).json({ success: true, message: 'User logged in successfully' });
//   } catch (error) {
//     console.error('Error during login:', error);
//     const errorMessage = (error as Error).message;
//     res.status(500).json({ success: false, message: errorMessage });
//   }
// });

// Validation middleware to sanitize inputs
router.post(
  '/login',
  [
    // Validation middleware to sanitize inputs
    body('username').trim().escape().notEmpty().withMessage('Username cannot be empty'),
    body('password').trim().escape().notEmpty().withMessage('Password cannot be empty'),
  ],
  async (req: LoginRequest, res: Response) => {
    //console.log("req.body in login", req.body);
    // console.log("In controller/user.ts /login"); 
    // console.log("req.body in login", req.body);

    // Extract sanitized values
    const { username, password } = req.body;
    const { isValid, errors } = validateLoginRequest(req);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }
    try {
      // Authenticate the user
      const user = await authenticateUser(username, password);
      req.session.user = user.username;
      res.status(200).json({ success: true, message: 'User logged in successfully' });
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessage = (error as Error).message;
      res.status(500).json({ success: false, message: errorMessage });
    }
  }
);


  /**
 * Logout a user
 * @route POST /logout
 * @group User - Operations about user
 */
// Refactored code for logout
router.post('/logout', async (req: Request, res: Response) => {
  // console.log("In controller/user.ts");
  // console.log("req.session", req.session);

  try {
    await logoutUser(req.session);
    res.status(200).json({ success: true, message: 'User logged out successfully' });
    console.log("User logged out successfully");
  } catch (error) {
    console.error('Error destroying session:', error);
    res.status(500).json({ success: false, message: 'An error occurred during logout' });
  }
});

  /**
   * check if user is logged in
   */
  router.get('/check', async (req: Request, res: Response) => {
    console.log("req.session in check", req.session);
    console.log("req.session.user in check", req.session.user);
    console.log("req.session.id in check", req.session.id);
    if (req.session.user) {
      res.status(200).json({ success: true, message: 'User is logged in', user: req.session.user });
    } else {
      res.status(401).json({ success: false, message: 'User is not logged in' });
    }
  }
  );
  /**
   * Get user details
   * @route GET /getUser
   * @group User - Operations about user
   * @returns {object} 200 - User details
   * @returns {object} 400 - Username is required
   * @returns {object} 404 - User not found
   * @returns {object} 500 - Error fetching user
   */

  router.get('/getUser', async (req: Request, res: Response) => {
    const username = req.session.user;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    try {
      const user = await getUserByUsername(username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  });
export default router;