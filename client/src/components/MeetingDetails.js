import React from "react";
import { Close, FileCopyOutlined } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { hideMeetingDetail, meetingId } from "../utility/utility";

const MeetingDetails = () => {
  return (
    <div className="chat_window" id="meeting_details">
      <div className="close_chat_window">
        <h3>Meeting Detail</h3>
        <Close onClick={hideMeetingDetail} />
      </div>
      <div className="meeting_details_link">
        <h3>Joining info</h3>
        <div className="meeting_link">
          <p>{meetingId}</p>
        </div>

        <CopyToClipboard
          value="123-abc-000"
          onCopy={() => {
            navigator.clipboard.writeText(meetingId);
          }}
        >
          <div className="copy_meeting_details">
            <span>
              <FileCopyOutlined />
              <p>Copy joining info</p>
            </span>
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default MeetingDetails;
