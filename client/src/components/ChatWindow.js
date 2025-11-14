import React, { useState, useEffect, useRef } from "react";
import { Close, Send } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { hideChatWindow } from "../utility/utility";
import Message from "./Message";
import { meetSocket } from "../App";
import { getTime } from "../utility/utility";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../Redux/Actions/UserActions";

const ChatWindow = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [allMessages, setAllMessages] = useState([]);
  const [myMsg, setMyMsg] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    meetSocket.emit("join-room", "roomToJoin", user.googleId);
  }, []);
  meetSocket.on("receive-message", (message, sender, time) => {
    let msg = {
      sender: sender,
      content: message,
      sentTime: time,
    };
    setAllMessages([...allMessages, msg]);
    //scrollToBottom();
  });
  const { messages } = useSelector((state) => state.messages);

  // Socket.io-client stuff for sending and receiving messages
  const sendMessage = () => {
    if (myMsg !== " ") {
      meetSocket.emit("send-message", myMsg, user, getTime());
      console.log(myMsg, "message sent", user);
      setMyMsg(" ");
    }

    //scrollToBottom();
  };

  return (
    <div className="chat_window" id="chat">
      <div className="close_chat_window">
        <h3>In-call messages</h3>
        <Close onClick={hideChatWindow} />
      </div>
      <div className="chat_window_info_para">
        <p>
          Messages can only be seen by people which are in call and will be
          deleted when call ends
        </p>
      </div>
      <div className="chat_messages_block" id="block">
        {allMessages &&
          allMessages.map((message) => {
            return (
              <>
                <Message
                  sender={message.sender}
                  time={message.sentTime}
                  content={message.content}
                />
                {/* <div ref={messagesEndRef} /> */}
              </>
            );
          })}
      </div>
      <div className="chat_send_message">
        <TextField
          id="outlined-basic"
          onChange={(e) => setMyMsg(e.target.value)}
          value={myMsg}
        />
        <div onClick={sendMessage}>
          <Send />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
