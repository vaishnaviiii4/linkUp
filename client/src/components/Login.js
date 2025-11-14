import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Avatar, Button } from "@material-ui/core";
import "../css/home.css";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../Redux/Actions/UserActions";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        name: decoded.name,
        email: decoded.email,
        imageUrl: decoded.picture,
        googleId: decoded.sub,
      };
      dispatch(loginUser(userData));
    } catch (error) {
      console.error("Failed to decode token:", error);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const handleLoginFailure = () => {
    console.error("Login failed");
    dispatch({ type: "LOGIN_FAILURE" });
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
    console.log("user logged out");
  };

  return (
    <div>
      {!isAuthenticated ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      ) : (
        <Button variant="contained" color="primary" onClick={handleSignOut}>
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default Login;
