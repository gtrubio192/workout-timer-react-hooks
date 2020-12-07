import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { Circle } from 'rc-progress';
import soundUrl from '../sounds/ding.mp3';
import successUrl from '../sounds/success.mp3';
import restBeeps from '../sounds/rest-beeps.mp3';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(props.time);
  const [task, setTask] = useState(props.task)
  const [isActive, setIsActive] = useState(props.isActive);
  const [totalTime, setTotalTime] = useState(props.time);
  const [isRestBuffer, setRestBuffer] = useState(false);
  const [play, { stop }] = useSound(soundUrl, { volume: .5 });
  const [playSuccess, { stahp }] = useSound( successUrl, { volume: 1 });
  const [playRestBeeps, {  }] = useSound( restBeeps, { volume: 1 });
  const [restTime, setRestTime] = useState(2);
  // const restTime = 2;

  const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const restBuffer = () => {
    let interval = null;
    console.log("rest buffer...??")
    if (isRestBuffer) {
      setRestBuffer(!isRestBuffer);
      interval = setInterval(() => {
        if(seconds >= 1) {
          console.log(seconds + " " + task)
          setSeconds(restTime => restTime - 1);
          console.log("rest buffer...??")
          playRestBeeps();
        }
      }, 1000);
    } else if (!isRestBuffer && restTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
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
          // call internal setInterval w/2 second gap
          // setRestBuffer(isRestBuffer => true);
          // restBuffer(true);
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
    setTotalTime(props.time);
  },[props.task, props.time])

  const circleContainerStyle = {
    width: '250px',
    height: '250px',
    display: 'inline-block',
  };

  return (
    <div className="app">
      {/* <div>Rest: {restTime}</div> */}
      <div  style={circleContainerStyle} className="timer-container row">
        <div className="timer-info">
          <p><strong>{task}</strong></p>
          <h1>{seconds}</h1>
        </div>
        <Circle percent={(seconds/totalTime)*100} strokeWidth={6} strokeColor="#3FC7FA" /> 
      </div>
    </div>
  );
};

export default Timer;