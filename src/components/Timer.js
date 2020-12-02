import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import soundUrl from '../sounds/ding.mp3';
import successUrl from '../sounds/success.mp3';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(props.time);
  const [task, setTask] = useState(props.task)
  const [isActive, setIsActive] = useState(props.isActive);

  const [play, { stop }] = useSound(
    soundUrl,
    { volume: .5 }
  );

  const [playSuccess, { stahp }] = useSound(
    successUrl,
    { volume: 1 }
  );

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(props.time);
    setIsActive(false);
    setTask(props.task);
  }

  const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  useEffect(() => {
    let interval = null;

    if (props.isActive) {
      setIsActive(props.isActive);
      interval = setInterval(() => {
        if(seconds >= 1) {
          console.log(seconds + " " + task)
          setSeconds(seconds => seconds - 1);
        }
        else {
          play();
          // sleep(1500);
          props.nextItem();
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    else if(!props.isActive) {
      playSuccess();
    }
    return () => clearInterval(interval);
  }, [props.isActive, seconds]);


  useEffect(() => {
    setTask(props.task);
    setSeconds(props.time);
  },[props.task, props.time])

  return (
    <div className="app">
      <div className="time">
        {task} - {seconds}s
      </div>
      <div className="row">
        {/* <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button> */}
      </div>
    </div>
  );
};

export default Timer;