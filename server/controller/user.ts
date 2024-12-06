import express from "express";
import { Request, Response } from "express";
import { getUserByUsername,insertNewUser,authenticateUser,logoutUser } from "../models/application";
import { LoginRequest,RegisterRequest } from "../models/types/types";
// import { saveUser } from "../models/application";
// import {IUser}  from "../models/types/types";

const router: express.Router = express.Router();


// router.post('/register', async (req: Request, res: Response) => {
//   const { firstname, lastname, username, email, password, dob } = req.body;
//   console.log("req.body",req.body);
//   try {
//     // Check if the email or username already exists
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       const conflictField = existingUser.email === email ? 'email' : 'username';
//       const conflictMessage =
//         conflictField === 'email'
//           ? 'This email is already registered. Please use a different email or log in.'
//           : 'This username is already in use. Please choose a different username.';
//       return res.status(400).json({ success: false, message: conflictMessage });
//     }
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       firstname,
//       lastname,
//       username,
//       email,
//       password: hashedPassword,
//       dob,
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ success: true, message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ success: false, message: 'An error occurred during registration' });
//   }
// });

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
router.post('/register', async (req: RegisterRequest, res: Response) => {
  const { firstname, lastname, username, email, password, dob } = req.body;
  console.log('req.body', req.body);
  try {
    // Insert the new user into the database
    const newUser = await insertNewUser({ firstname, lastname, username, email, password, dob });
    res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    const errorMessage = (error as Error).message;
    res.status(500).json({ success: false, message: errorMessage });
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

// router.post('/login', async (req: LoginRequest, res: Response) => {
//     console.log("req.body in login",req.body);
//     const { username, password } = req.body;
  
//     try {
//       const user = await User.findOne({ username });
//       console.log("user",user);
//       if (!user) {
//         return res.status(400).json({ success: false, message: 'No account found with this username. Please register or try again.' });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!user || !isMatch) {
//         return res.status(400).json({ 
//             success: false, 
//             message: 'Invalid credentials. Please try again.' 
//         });
//     }
  
//       // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       req.session.user = user.username;
//       res.status(200).json({ success: true, message: 'User logged in successfully' /*, token */ });
//     } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).json({ success: false, message: 'An error occurred during login' });
//     }
//   });



/**
 * Login a user
 * @route POST /login
 * @group User - Operations about user
 * @param {string} username.body.required - Username of the user
 * @param {string} password.body.required - Password of the user
 */
// Refactored code for login
router.post('/login', async (req: LoginRequest, res: Response) => {
  console.log("req.body in login", req.body);
  const { username, password } = req.body;

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
});


    /**
     * Logout
     */
  // router.post('/logout', async (req: Request, res: Response) => {
  //   console.log("In controller/user.ts");
  //   console.log("req.session",req.session);
  //   req.session.destroy((error: Error) => {
  //     if (error) {
  //       console.error('Error destroying session:', error);
  //       return res.status(500).json({ success: false, message: 'An error occurred during logout' });
  //     }
  
  //     res.status(200).json({ success: true, message: 'User logged out successfully' });
  //     console.log("User logged out successfully");
  //   });
  // });

  /**
 * Logout a user
 * @route POST /logout
 * @group User - Operations about user
 */
// Refactored code for logout
router.post('/logout', async (req: Request, res: Response) => {
  console.log("In controller/user.ts");
  console.log("req.session", req.session);

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
    if (req.session.user) {
      res.status(200).json({ success: true, message: 'User is logged in', user: req.session.user });
    } else {
      res.status(401).json({ success: false, message: 'User is not logged in' });
    }
  }
  );

  router.get('/getUser', async (req: Request, res: Response) => {
    const username = req.session.user;
    console.log("username in getUser",username);
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