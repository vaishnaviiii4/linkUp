import {
  CallEndRounded,
  VideocamRounded,
  VideocamOffRounded,
  MicNoneRounded,
  MicOffRounded,
  KeyboardVoiceRounded,
  ClosedCaptionRounded,
  PanToolRounded,
  PresentToAllRounded,
  MoreVertRounded,
  InfoRounded,
  ChatRounded,
  PeopleRounded,
  SecurityRounded,
} from "@material-ui/icons";
import React, { useRef, useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import {
  getTime,
  meetingId,
  openChatWindow,
  openMeetingDetails,
} from "../utility/utility";
import "../css/meet.css";
import MeetingDetails from "./MeetingDetails";
import Video from "./Video";
import { useSelector } from "react-redux";
// peer Js
import Peer from "peerjs";
import { meetSocket } from "../App";

const MeetPage = () => {
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const peerInstance = useRef(null);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    const peer = new Peer(user.googleId || null, {
      path: "/peerjs",
      host: "/",
      port: "5000",
      debug: 3,
      secure: false,
    });
    peer.on("open", (id) => {
      console.log("peer connected with : ", id);
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        myVideo.current.srcObject = stream;
        myVideo.current.play();
        myVideo.current.muted = true;
        // emitted when any remote peer tries to call you
        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userStream) => {
            userVideo.current.srcObject = userStream;
            userVideo.current.play();
            userVideo.current.muted = true;
          });
        });
        meetSocket.on("user-connected", (userId) => {
          console.log("user joined room with id: ", userId);
          // whenever someone connects then call them
          setTimeout(() => {
            const call = peer.call(userId, stream);
            call.on("stream", (userVideoStream) => {
              userVideo.current.srcObject = userVideoStream;
              userVideo.current.play();
              userVideo.current.muted = true;
            });
          }, 1000);
        });
      });
    peerInstance.current = peer;
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <ChatWindow />
          <MeetingDetails />
          <div className="meetPage">
            <div className="meet_videos_section">
              <Video refProp={myVideo} />
              {userVideo !== null ? <Video refProp={userVideo} /> : null}
            </div>
            <div className="meet_bottom">
              <div className="bottom_options bottom_options_left">
                <h3>
                  {getTime()}| {meetingId}
                </h3>
              </div>
              <div className="bottom_options bottom_options_center">
                <span className="bottom_options_span">
                  <KeyboardVoiceRounded className="bottom_options_icon" />
                </span>
                <span className="bottom_options_span">
                  <VideocamRounded className="bottom_options_icon" />
                </span>
                <span className="bottom_options_span">
                  <ClosedCaptionRounded className="bottom_options_icon" />
                </span>
                <span className="bottom_options_span">
                  <PanToolRounded className="bottom_options_icon" />
                </span>
                <span className="bottom_options_span">
                  <PresentToAllRounded className="bottom_options_icon" />
                </span>
                <span className="bottom_options_span">
                  <MoreVertRounded className="bottom_options_icon" />
                </span>
                <span className="bottom_options_span">
                  <CallEndRounded className="bottom_options_icon bg_color_red" />
                </span>
              </div>
              <div className="bottom_options bottom_options_right">
                <InfoRounded
                  className="bottom_options_icon"
                  onClick={openMeetingDetails}
                />
                <PeopleRounded className="bottom_options_icon" />
                <ChatRounded
                  className="bottom_options_icon"
                  onClick={openChatWindow}
                />
                <SecurityRounded className="bottom_options_icon" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default MeetPage;
