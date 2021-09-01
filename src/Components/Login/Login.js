import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../../redux/userReducer.js";

import {
  ToggleBox,
  Window,
  Box,
  Input,
  Submit,
  LoginToggle,
  RegisterToggle,
  Bee,
  Title,
  Error
} from "./styles.js";
import bee from '../../Assets/Gather_Line_with_Bee.png'



const Login = (props) => {
  const [loginUser, setLoginUser] = useState("");
  const [newUser, setNewUser] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [toggle, setToggle] = useState({
    nullToggle: true,
    loginToggle: false,
    registerToggle: false,
  });
  const history = useHistory(),
      { push } = history;
  const { user } = props,
  {loginError,registerError,isLoggedIn}=user

  const { pathname } = props.history.location.pathname;
useEffect(()=>{
  loginError?setLoginErrorMessage('Something Went Wrong. Please Try Again'):setLoginErrorMessage('');
},[loginError]);
useEffect(()=>{
  registerError?setRegisterErrorMessage('Something Went Wrong. Please Try Again'):setRegisterErrorMessage('');
},[registerError]);

  useEffect(() => {
    if (isLoggedIn===true) {
      push("/home");
    }
  }, [isLoggedIn, pathname, push]);

  const handleLogin = () => {
    props.loginUser(loginUser.email, loginUser.password);
  };
  const handleRegister = () => {
    props.registerUser(
      newUser.first_name,
      newUser.last_name,
    newUser.username,
      newUser.email,
      newUser.password
    );
  };
 let loginErrorDisplay=loginError?<Error>{loginErrorMessage}</Error>:<></>
 let registerErrorDisplay=registerError?<Error>{registerErrorMessage}</Error>:<></>
  let loginWindow = (
    <>
      <Input
        onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
        type="text"
        placeholder="Enter email"
      />
      <Input
        onChange={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
        type="text"
        placeholder="Enter password"
      />
{loginErrorDisplay}
      <Submit onClick={() => handleLogin()}>Submit</Submit>
    </>
  );

  let registerWindow = (
    <>
      <Input
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="Pick a username!"
      />
        <Input
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="registerInput"
          type="text"
          placeholder="What's your email?"
        />
      <Input
        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="What's your first name?"
      />
      <Input
        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="What's your last name?"
      />
      <Input
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="Enter a password"
      />
      <Input
        onChange={(e) =>
          setNewUser({ ...newUser, passwordTwo: e.target.value })
        }
        className="registerInput"
        type="text"
        placeholder="Please verify your password"
      />
      {registerErrorDisplay}
      {props.user.isRegistered ? (
<Submit onClick={()=>push("/profile/uploads")}>Next</Submit>
      ) : (
        <Submit onClick={() => handleRegister()}>Submit</Submit>
      )}
    </>
  );

  const handleLoginClick = () => {
    if (toggle.nullToggle || toggle.registerToggle) {
      setToggle({
        ...toggle,
        nullToggle: false,
        loginToggle: true,
        registerToggle: false,
      });
    } else {
      setToggle({
        ...toggle,
        registerToggle: false,
        loginToggle: false,
        nullToggle: true,
      });
    }
  };
  const handleRegisterClick = () => {
    if (toggle.nullToggle || toggle.loginToggle) {
      setToggle({
        ...toggle,
        registerToggle: true,
        loginToggle: false,
        nullToggle: false,
      });
    } else {
      setToggle({
        ...toggle,
        registerToggle: false,
        loginToggle: false,
        nullToggle: true,
      });
    }
  };
  const windowToggle = toggle.nullToggle ? (
    <></>
  ) : toggle.loginToggle ? (
    loginWindow
  ) : toggle.registerToggle ? (
    registerWindow
  ) : (
    <></>
  );

  return (
    <Window>
      <div>
        <p>A place for friends to...</p>
        <Bee src={bee} alt=''/>
        <Box>
          <Title>Gather</Title>
          {windowToggle}
        </Box>
        <ToggleBox>
          <LoginToggle onClick={handleLoginClick}>Login</LoginToggle>
          <RegisterToggle onClick={handleRegisterClick}>
            Register
          </RegisterToggle>
        </ToggleBox>
      </div>
{console.log(props)}
    </Window>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { loginUser, registerUser })(Login);
