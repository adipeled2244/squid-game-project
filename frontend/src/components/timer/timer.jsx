import React, { useState,useEffect } from 'react';
import './timer.css'

export function Timer({timeTimer,setIsTimeEnd}) {

 const [daysLeft, setDaysLeft] = useState('');
 const [timeLeft, setTime] = useState('');

 

 useEffect(()=>{
  let countDownDate = new Date(timeTimer).getTime();
  let myfunc = setInterval(function() {

      let now = new Date().getTime();
      let timeleft = countDownDate - now;

      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

      let timeToShow;
      if (hours < 10) {
          hours = '0' + hours;
      }
      if (minutes < 10) {
          minutes = '0' + minutes;
      }
      if (seconds < 10) {
          seconds = '0' + seconds;
      }
      if (days == 0) {
        setDaysLeft('Today');         
      } else {
        setDaysLeft(days+' days');
      }
      if (timeleft <= 0) {
          clearInterval(myfunc);
          setTime('TIME UP!!');
          setDaysLeft('');
          setTimeout(() => {
            setIsTimeEnd(true);
          }, 3000);
      } else {
          timeToShow = hours + ":" + minutes + ":" + seconds;
          setTime(timeToShow);
      }
  }, 1000);

    return ()=>{
      clearInterval(myfunc);
      setDaysLeft('');
      setTime('');
    }
 },[])
 
  return <>
     <section className="timerPage ">
        <div className="daysLeft">{daysLeft}</div>
        <div id="MyClockDisplay" className="clock">{timeLeft}</div>
    </section>
  </>;
}
