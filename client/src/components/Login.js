import React, { useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Avatar } from "@material-ui/core";
import "../css/home.css";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../Redux/Actions/UserActions";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_KEY = process.env.REACT_APP_GOOGLE_SECRET_KEY;

const Login = () => {
  const dispatch = useDispatch();
  const onLoginSuccess = (res) => {
    dispatch(loginUser(res.profileObj));
  };

  const onLoginFailure = () => {};

  const onSignoutSuccess = () => {
    dispatch(logoutUser());
    console.log("user logged out");
  };
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  return (
    <div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign In"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
      <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign Out"
        onLogoutSuccess={onSignoutSuccess}
      />
    </div>
  );
};

export default Login;
