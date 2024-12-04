import React from 'react';
import Form from "../main/baseComponents/form/formView";
import Input from "../main/baseComponents/input/inputView";
import { Button, Typography, Link,TextField } from "@mui/material";
import useLoginUser from '../../hooks/useLoginUser'; 
import Textarea from '../main/baseComponents/textarea/textAreaView';
interface LoginProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  navigateToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, navigateToRegister }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    usernameErr,
    passwordErr,
    handleLogin,
  } = useLoginUser(setIsLoggedIn);

  return (
    <>
      <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "20px", marginTop: "20px" }} component="h2" align="center" gutterBottom>
        Sign In
      </Typography>
      <Form>
        <Input
          title={"Username"}
          id={"formUsernameInput"}
          val={username}
          setState={setUsername}
          err={usernameErr}
        />
        <Textarea
          title={"Password"}
          id={"formPasswordInput"}
          val={password}
          setState={setPassword}
          err={passwordErr}
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
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
        <div className="btn_indicator_container">
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{ textTransform: "none" }}
          >
            Sign In
          </Button>
          <div className="mandatory_indicator">
            * indicates mandatory fields
          </div>
        </div>
        <Link href="#" variant="body2" onClick={navigateToRegister}>
          {"Don't have an account? Sign up"}
        </Link>
      </Form>
    </>
  );
};

export default Login;