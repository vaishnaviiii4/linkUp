import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/video.css";

import io from "socket.io-client";

import Peer from "peerjs";

// sockets namespaces
const socket = io.connect("http://localhost:5000");
const meetSocket = io.connect("http://localhost:5000/meet");

// peerjs stuff
const peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "5000",
});

const VideoStreams = ({ roomId }) => {
  const { roomToJoin } = useParams();
  const [message, setMessage] = useState("");
  const [Othermessage, setOtherMessage] = useState([]);

  const displayedData = ["myname", "is"];
  displayedData.push("hi");
  // video refs
  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        addVideoToStream(stream, myVideo);
        myVideo.current.muted = true;

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (callerStream) => {
            addVideoToStream(callerStream, userVideo);
          });
        });
        meetSocket.on("user-joined", (userId) => {
          const call = peer.call(userId, stream);
          call.on("stream", (connectedUserVideoStream) => {
            addVideoToStream(userVideo, connectedUserVideoStream);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roomToJoin]);

  // 2. making connection
  // whenever opened there will be created an id for that specific user.
  // we want when a user connects there will be  emmited an event join room
  peer.on("open", (userId) => {
    meetSocket.emit("join-room", roomToJoin, userId); // joined room // room_id comming from zoom.js where we have provided in script tag
    // -> user is connected with id userId in room id ROOM_ID
  });

  // sending and receiving message
  const sendMessage = () => {
    console.log("clicked");
    meetSocket.emit("send-message", message);
    displayedData.push("message");
  };

  meetSocket.on("receive-message", (message) => {
    setOtherMessage([...Othermessage, message]);
    //console.log("message : ", message);
  });

  // utility functions
  const addVideoToStream = (stream, videoElem) => {
    videoElem.current.srcObject = stream;
    myVideo.current.play();
  };

  return (
    <>
      <h2>Video Streams</h2>
      <video ref={myVideo}></video>
      <video ref={userVideo}></video>
      <div className="messenger">
        <input
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        ></input>
        <button onClick={sendMessage}>send message</button>
      </div>
      <div>
        <h3>Display</h3>
        {Othermessage.map((div) => {
          return <p>{div}</p>;
        })}
      </div>
    </>
  );
};

export default VideoStreams;
