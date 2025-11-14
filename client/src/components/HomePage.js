import React, { useState } from "react";
import { useSelector } from "react-redux";
import meetImage from "../images/meet_image.svg";
import logo from "../images/meeting_logo_2.jpg";
import { VideoCallOutlined, Keyboard } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { TextField } from "@material-ui/core";
import Login from "./Login";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [roomToJoin, setRoomToJoin] = useState("");
  const [alert, setAlert] = useState("");
  const checkUserAuth = () => {
    !isAuthenticated ? setAlert("Login First") : navigate("/meet");
  };
  setTimeout(() => {
    setAlert("");
  }, 2000);
  return (
    <>
      <div className="nav_bar">
        <div className="left_nav_bar">
          <div className="logo">
            <img src={logo} alt="meet onine" />
          </div>
          <div className="logo_content">LinkUp</div>
        </div>
        <div className="account_section">
          <Login />
        </div>
      </div>
      <div className="home_section">
        <div className="left_section">
          <div className="main_heading">
            Secure video conferencing for anyone
          </div>
          <div className="main_paragraph">
            <p>Connect with each others from globe and celeberate with us</p>
          </div>
          <p>{alert}</p>
          <div className="main_buttons">
            <button
              id="start_meeting_button"
              className="main_button"
              onClick={checkUserAuth}
            >
              <span>
                <VideoCallOutlined />
              </span>
              Start Meet
            </button>
            <button id="join_meeting_button" className="main_button">
              <span>
                <Keyboard />
              </span>
              <TextField
                onChange={(e) => {
                  setRoomToJoin(e.target.value);
                }}
                value={roomToJoin}
              />
            </button>
            <a
              href={`/meet/p/${roomToJoin}`}
              id="join_button"
              className="main_button"
            >
              Join
            </a>
          </div>
        </div>
        <div className="right_section">
          <div className="main_image">
            <img src={meetImage} alt="" />
          </div>
          <div className="image_content">
            <div className="image_heading main_heading">
              Get a link to share
            </div>
            <div className="image_paragraph">
              Enjoy meeting online with friend, let them enjoy by sharing
              meeting link
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
