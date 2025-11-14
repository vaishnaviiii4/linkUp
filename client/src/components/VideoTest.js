import React, { useEffect, useRef, useState } from "react";
import { meetSocket } from "../App";
import Peer from "peerjs";
import { useSelector } from "react-redux";

const VideoTest = () => {
  const myVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const videoElement = useRef(null);
  const peerInstance = useRef(null);

  const [myStream, setMyStream] = useState("");
  const [myPeerId, setMyPeerId] = useState("");
  const [userPeerId, setUserPeerId] = useState("");

  const addVideoToContainer = (stream, videoElem) => {
    videoElem.current.srcObject = stream;
    myVideoRef.current.play();
  };

  useEffect(() => {
    const peer = new Peer(undefined, {
      path: "/peerjs",
      host: "/",
      port: "5000",
      debug: 3,
      secure: false,
    });

    peer.on("open", (id) => {
      console.log("peer connected with id: ", id);
    });

    // getting stream

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        addVideoToContainer(stream, myVideoRef);
        myVideoRef.current.muted = true;
        // when anyone try to call you
        peer.on("call", (call) => {
          call.answer(stream); // Answer the call with our own stream

          call.on("stream", (userStream) => {
            addVideoToContainer(userStream, userVideoRef);
          });
        });
        peerInstance.current = peer;

        meetSocket.on("user-connected", (id) => {
          console.log("user connected to room with id: ", id);
          setTimeout(connectNewUser, 1000, id, stream, peer);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const connectNewUser = (userId, stream, peer) => {
    const call = peer.call(userId, stream);
    call.on("stream", (connectedUserVideoStream) => {
      addVideoToContainer(connectedUserVideoStream, videoElement);
    });
  };
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      <h1>Video Stream</h1>
      <video ref={myVideoRef} />
      <video ref={userVideoRef} />
      <video ref={videoElement} />
    </div>
  );
};

export default VideoTest;
