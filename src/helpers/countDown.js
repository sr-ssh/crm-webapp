import React from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import { useState, useEffect } from "react";

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }, setCountDown) => {
  if (completed) {
    // Render a complete state
    setCountDown();
    return " ";
  } else {
    // Render a countdown
    return (
      <span>
        {"0" + minutes}:{seconds > 9 ? seconds : "0" + seconds}
      </span>
    );
  }
};

const getLocalStorageValue = (s) => localStorage.getItem(s);

export const CountDownFunc = ({ delay, force, setCountDown, ...props }) => {
  const [data, setData] = useState(
    { date: Date.now(), delay: delay } //10 seconds
  );
  const wantedDelay = 90000; //10 ms

  //[START] componentDidMount
  //Code runs only one time after each reloading
  useEffect(() => {
    const savedDate = getLocalStorageValue("end_date");
    if (savedDate == null && force == true) {
      setCountDown();
      return;
    }
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      //Do you reach the end?
      if (delta > wantedDelay) {
        //Yes we clear uour saved end date
        if (localStorage.getItem("end_date").length > 0)
          localStorage.removeItem("end_date");
      } else {
        //No update the end date with the current date
        setData({ date: currentTime, delay: delta });
      }
    }
  }, []);
  //[END] componentDidMount

  return (
    <div>
      <Countdown
        date={data.date + data.delay}
        renderer={(e) => renderer(e, () => setCountDown())}
        onStart={(delta) => {
          //Save the end date
          if (localStorage.getItem("end_date") == null)
            localStorage.setItem(
              "end_date",
              JSON.stringify(data.date + data.delay)
            );
        }}
        onComplete={() => {
          if (localStorage.getItem("end_date") != null)
            localStorage.removeItem("end_date");
        }}
      />
    </div>
  );
};
