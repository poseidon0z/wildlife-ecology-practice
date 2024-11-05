import React, { useState, useEffect, useRef, useImperativeHandle, ForwardRefRenderFunction } from 'react';

interface StopwatchProps {}

export interface StopwatchHandles {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const Stopwatch: ForwardRefRenderFunction<StopwatchHandles, StopwatchProps> = (_, ref) => {
  const [time, setTime] = useState<number>(0);  // Time in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);  // Timer reference

  // Start the stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);  // Increment time by 1 second
      }, 1000);
    }
  };

  // Stop the stopwatch
  const stopStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);  // Clear the interval to stop the timer
        timerRef.current = null;
      }
    }
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    stopStopwatch();
    setTime(0);  // Reset time to 0
  };

  // Expose the functions to the parent component
  useImperativeHandle(ref, () => ({
    start: startStopwatch,
    stop: stopStopwatch,
    reset: resetStopwatch
  }));

  useEffect(() => {
    // Cleanup the interval when the component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Convert time in seconds to minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  

  return (
    <div >
      <h1 className='p-3 text-left border rounded-md bg-slate-100'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
    </div>
  );
};

export default React.forwardRef(Stopwatch);
