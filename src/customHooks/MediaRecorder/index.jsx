
export const useMediaRecorder = (props) => {
  let videoChunks = [];
  let audioChunks = [];
  const {
    recorder,
    setRecorder,
    setScreenRecordedVideo,
    setRecordedVideo,
    audioStream,
    setAudioStream,
    videoStream,
    setVideoStream,
  } = props;

  // its will be use to check the available devices on the devices
  const checkRequiredDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const checkMicrophone = devices.some((e) => e.kind == "audioinput");
    const checkCamera = devices.some((e) => e.kind == "videoinput");
    if (checkCamera && checkMicrophone) {
      return true;
    }
  };

  //  it will get teh device access from the user browsser
  const getDevicesAccess = async () => {
    try {
      const audioPermission = { video: true, audio: true };
      const videoStream = await navigator.mediaDevices.getDisplayMedia();
      const audioStream = await navigator.mediaDevices.getUserMedia(
        audioPermission
      );
      setVideoStream(videoStream);
      setAudioStream(audioStream);
      return { videoStream, audioStream };
    } catch (error) {
      throw new Error(
        "You Denied The Acces Cant Start The Assignment Right Now"
      );
      // return false;
    }
  };

  // this function is triggered when the click on the start assigment and its takes the camera and audio  permission form the user
  const startRecording = async ({ audioStream, videoStream }) => {
    if (audioStream != false && videoStream != false) {
      const audioRecorder = new MediaRecorder(audioStream);
      const videoRecorder = new MediaRecorder(videoStream);

      audioRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      videoRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          videoChunks.push(e.data);
        }
      };

      videoRecorder.onstop = (e) => {
        const blob = new Blob(videoChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setScreenRecordedVideo(url);
      };

      audioRecorder.onstop = (e) => {
        const blob = new Blob(audioChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
      };

      setRecorder({ audioRecorder, videoRecorder });
      audioRecorder.start();
      videoRecorder.start();
    }
  };

  const stopAndSaveRecording = () => {
    recorder && recorder.audioRecorder.stop();
    recorder && recorder.videoRecorder.stop();

    if (audioStream) audioStream.getTracks().forEach((track) => track.stop());

    if (videoStream) videoStream.getTracks().forEach((track) => track.stop());
  };

  return {
    checkRequiredDevices,
    getDevicesAccess,
    startRecording,
    stopAndSaveRecording,
  };
};
