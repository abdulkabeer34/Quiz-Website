import React, { createContext } from "react";
import { useMediaRecorder } from "../customHooks";

const MediaRecorderContext = createContext();

export const MediaRecorderContextStore = () => {
  const { getDevicesAccess, startRecording, checkRequiredDevices } =
    useMediaRecorder({});

  return (
    <MediaRecorderContext.Provider
      value={{ getDevicesAccess, startRecording, checkRequiredDevices }}
    ></MediaRecorderContext.Provider>
  );
};
