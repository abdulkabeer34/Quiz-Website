import React, { useEffect, useState } from "react";

let intervalId;

export const useSetInterval = () => {
  
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  const start = ({ callback, delay, ...restProps }) => {
    intervalId = setInterval(() => callback({ ...restProps }), delay);
  };

  const stop = () => {
    clearInterval(intervalId);
  };

  return { start, stop };
};
