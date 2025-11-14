export function getTime() {
  var today = new Date();
  let hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
  let d = today.getHours() > 12 ? "PM" : "AM";
  let time = hours + " : " + today.getMinutes();
  time = time + " " + d;
  return time;
}

export const hideMeetingDetail = () => {
  document.getElementById("meeting_details").style.display = "none";
};

export const hideChatWindow = () => {
  document.getElementById("chat").style.display = "none";
};

export const openChatWindow = () => {
  document.getElementById("chat").style.display = "block";
};
export const openMeetingDetails = () => {
  document.getElementById("meeting_details").style.display = "block";
};

export const meetingId = "abc-123-000";

// video streaming functions
export const createVideoElement = () => {};
