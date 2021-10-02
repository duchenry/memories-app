import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import Icon from "./Icon"
import Input from "./Input";
import { GoogleLogin } from "react-google-login"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useStyles from "./styles";
import {signup, signin } from "../../action/auth"

const initialState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};
const Auth = () => {
  const history = useHistory();
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name] : e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const switchMode = () => {
    setIsSignup((prev) => !prev);
  } ;
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({type: "AUTH", data: {result, token}});
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  const googleFailure = () => {
    console.log("Google Sign in is not working. Try again later")
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half xs={6} />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half xs={6} />
              </>
            )}
            <Input name="email" label="Email" handleChange={handleChange} type="email" xs={6} />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} xs={6} />
            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showConfirmPassword ? "text" : "password"} handleShowConfirmPassword={handleShowConfirmPassword} />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary"  className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="628621663229-4u4k7nc36278kaqni543i7d2ahncfog1.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="secondary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? "Already have an account? Sign In" : "Haven't got an account? Sign Up"}
                </Button>
              </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
