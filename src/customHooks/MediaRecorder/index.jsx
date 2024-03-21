import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecorder, setRecoredVideo } from "../../store/quizStore";
import { QuizAreaContext } from "../../store/ContextApiStore";

export const useMediaRecorder = () => {
  const dispatch = useDispatch();
  // const recorder = useSelector((e) => e.quizStore.recorder);
  const { recorder, setRecorder, setRecordedVideo } =
    useContext(QuizAreaContext);
  let chunks = [];

  // its will be use to check the available devices on the devices
  const checkRequiredDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    const checkMicrophone = devices.some((e) => e.kind == "audioinput");
    const checkCamera = devices.some((e) => e.kind == "videoinput");
    if (checkCamera && checkMicrophone) {
      return true;
    }
  };

  //  it will get teh device access from the user browsser
  const getDevicesAccess = async () => {
    try {
      const permissions = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(permissions);
      return stream;
    } catch (error) {
      console.log(error);
      throw new Error("You Denied The Acces Cant Start The Assignment Right Now")
      // return false;
    }
  };

  // this function is triggered when the click on the start assigment and its takes the camera and audio  permission form the user
  const startRecording = async (stream) => {
    if (stream != false) {
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      recorder.onstop = (e) => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
      };

      setRecorder(recorder);
      recorder.start();
    }
  };

  const stopAndSaveRecording = () => {
    recorder && recorder.stop();
  };
  return {
    checkRequiredDevices,
    getDevicesAccess,
    startRecording,
    stopAndSaveRecording,
  };
};
