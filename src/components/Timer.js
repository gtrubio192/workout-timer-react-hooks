import React, { useState, useEffect } from 'react';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(props.time);
  const [task, setTask] = useState(props.task)
  const [isActive, setIsActive] = useState(props.isActive);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(props.time);
    setIsActive(false);
    setTask(props.task);
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
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
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