import React from 'react';
import './timer.css'

export function Timer({timeTimer}) {

    
  return <>
     <section className="timerPage ">
        <div className="daysLeft"></div>
        <div id="MyClockDisplay" className="clock"></div>
    </section>
  </>;
}
