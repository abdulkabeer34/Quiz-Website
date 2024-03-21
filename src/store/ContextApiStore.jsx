import React, { createContext, useState } from "react";
export const QuizAreaContext = createContext();

let interval;
export const ContextProvider = ({ children }) => {
  const [recorder, setRecorder] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const StartInterval = ({ callback, props, delay }) => {
    interval = setInterval(() => callback(props), delay);
  };
  const StopInterval = () => {
    clearInterval(interval);
    interval = null;
  };

  return (
    <QuizAreaContext.Provider
      value={{
        StartInterval,
        StopInterval,
        // handleMediaAccess,
        recorder,
        setRecorder,
        recordedVideo,
        setRecordedVideo,
      }}
    >
      {children}
    </QuizAreaContext.Provider>
  );
};
