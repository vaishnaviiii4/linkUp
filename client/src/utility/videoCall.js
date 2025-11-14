// get own video
// -> create video element -> add stream to element
// call next person with own stream
// answer call with caller stream
export function getOwnMediaStream() {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      console.log(stream);
    })
    .catch((err) => {
      console.log(err);
    });
}
