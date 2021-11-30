import React, { useState } from 'react'
import { GetData, SetData } from '../Utils/LocalStorage';
import * as Components from "./LoginComponents";
import { TextField } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateAction } from '../Redux/action';

export const SignUp = ({handleSign}) => {
    const [signIn, toggle] = React.useState(true);
    const dispatch = useDispatch()

    const { data, key, isLoading, isError } = useSelector(
        (state) => state.updateReducer,
        shallowEqual
    );
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        fullname: "",
        number: "",
      });
      const { username, email, password, fullname, number } = user;

  const handle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
    const handleSignUp=(e)=>{
        e.preventDefault()
        const { username, email, password, fullname, number } = user;

    const payload = {
      username,
      email,
      password,
      fullname,
      number,
    };
        SetData("signupData",payload)
        dispatch(updateAction(payload))
        
    }

    // login
    const [userLogin, setUserLogin] = useState({
        usernameLogin: "",
        passwordLogin: "",
      });
      const { usernameLogin, passwordLogin } = userLogin;

  const handleLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const submitLogin = async (e) => {
    e.preventDefault();
    let data = GetData("signupData")
    console.log(data,"data");
    const { usernameLogin, passwordLogin } = userLogin;
    const payload = {
      username: usernameLogin,
      password: passwordLogin,
    };
    // console.log(payload);
        if(data.username===payload.username&&data.password===payload.password){
            SetData("key","123")
            handleSign(false)
        }else{
            alert("Invalid Cradentials")
        }
}
   
  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <TextField
            className="input"
            required
            id="outlined-required"
            type="text"
            name="fullname"
            label="Enter your name"
            value={fullname}
            onChange={handle}
          />
          <TextField
            className="input"
            required
            id="outlined-required"
            type="email"
            name="email"
            label="Enter your Email"
            value={email}
            onChange={handle}
          />
          <TextField
            className="input"
            required
            id="outlined-required"
            type="text"
            name="username"
            label="Enter your username"
            value={username}
            onChange={handle}
          />
          <TextField
            className="input"
            required
            id="outlined-required"
            type="password"
            name="password"
            label="Enter your password"
            value={password}
            onChange={handle}
          />
          <TextField
            className="input"
            required
            id="outlined-required"
            type="number"
            name="number"
            label="Enter your contact number"
            value={number}
            onChange={handle}
          />
          <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <TextField
            className="input"
            required
            id="outlined-required"
            onChange={handleLogin}
            value={usernameLogin}
            type="email"
            label="Username"
            name="usernameLogin"
          />

          <TextField
            className="input"
            required
            onChange={handleLogin}
            id="outlined-required"
            name="passwordLogin"
            type="password"
            label="Password"
            value={passwordLogin}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button
            onClick={(e) => {
              submitLogin(e);
            }}
          >
            Sign In
          </Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};
