import React from 'react';
import Form from "../main/baseComponents/form/formView";
import Input from "../main/baseComponents/input/inputView";
import { Button, Typography, Link } from "@mui/material";
import useNewUser from '../../hooks/useNewUser'; 
import { RegistrationProps } from '../../types/entityTypes';
import Textarea from '../main/baseComponents/textarea/textAreaView';

/**
 * Registration component for user sign-up
 * @param setIsLoggedIn - Function to set the login state
 * @param navigateToLogin - Function to navigate to the login page
 */
const Registration: React.FC<RegistrationProps> = ({ setIsLoggedIn, navigateToLogin }) => {
  const {
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
  } = useNewUser(setIsLoggedIn,navigateToLogin);

  return (
    <>
      <Typography id="RegisterTitle" variant="h4" style={{ fontWeight: "bold", marginBottom: "20px", marginTop: "20px" }} component="h2" align="center" gutterBottom>
        Register a New Account
      </Typography>
      <Form>
        <Input
          title={"First Name"}
          id={"formFirstnameInput"}
          val={firstname}
          setState={setFirstname}
          err={firstnameErr}
        />
        
        <Input
          title={"Last Name"}
          id={"formLastnameInput"}
          val={lastname}
          setState={setLastname}
          err={lastnameErr}
        />
        <Input
          title={"Username"}
          id={"formUsernameInput"}
          val={username}
          setState={setUsername}
          err={usernameErr}
        />
        <Input
          title={"Email Address"}
          id={"formEmailInput"}
          val={email}
          setState={setEmail}
          err={emailErr}
        />
        <Textarea
          title={"Password"}
          id={"formPasswordInput"}
          val={password}
          setState={setPassword}
          err={passwordErr}
          type="password"
        />
        <Textarea
          title={"Confirm Password"}
          id={"formConfirmPasswordInput"}
          val={confirmPassword}
          setState={setConfirmPassword}
          err={confirmPasswordErr}
          type="password"
       
        />
        {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /> */}
          <Textarea
          title={"Date of Birth"}
          id={"formDobInput"}
          val={dob}
          setState={setDob}
          type="date"
          shrink={true}
        
        />
          {/* <TextField
            margin="normal"
            fullWidth
            name="dob"
            label="Date of Birth"
            type="date"
            id="dob"
            InputLabelProps={{ shrink: true }}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          /> */}

        <div className="btn_indicator_container">
          <Button
          id="registerBtn"
            variant="contained"
            onClick={handleRegister}
            sx={{ textTransform: "none" }}
          >
            Register
          </Button>
          <div className="mandatory_indicator">
            * indicates mandatory fields
          </div>
        </div>
        <Link href="#" variant="body2" onClick={navigateToLogin}>
          {"Already have an account? Sign in"}
        </Link>
      </Form>
    </>
  );
};

export default Registration;