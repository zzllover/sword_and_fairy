
const mediaStreamConstrains = {
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  }
};

const localVideo = document.querySelector('video');

function getLocalMediaStream(mediaStream) {
  localVideo.srcObject = mediaStream;
}

function handleLocalMediaStream(error) {
  console.log(error);
}


navigator.mediaDevices.
  getUserMedia(mediaStreamConstrains)
  .then(getLocalMediaStream)
  .catch(handleLocalMediaStream);