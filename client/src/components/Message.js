import { Avatar } from "@material-ui/core";
import React from "react";
import "../css/message.css";
const Message = ({ sender, time, content }) => {
  return (
    <div className="chat_message">
      <div className="message_sender_avatar">
        <Avatar alt="m" src="not" style={{ width: 40, height: 40 }} />
      </div>
      <div className="chat_message_content">
        <div className="chat_message_upper_row">
          <div className="chat_message_sender_name">{sender.givenName}</div>
          <div className="chat_message_time">{time}</div>
        </div>
        <div className="chat_actual_message">{content}</div>
      </div>
    </div>
  );
};

export default Message;
