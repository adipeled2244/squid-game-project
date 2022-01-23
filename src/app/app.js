import logo from './logo.svg';
import './app.css';
import { Header } from '../components/header/header';
import {Timer} from '../pages/timer/timer'
import React, { useState } from 'react';
import {Profile} from '../pages/profile/profile'

function App() {
    const [timeTimer, setTimeTimer] = useState('2022-01-23T16:30:00.726+00:00');
    const [user, setUser] = useState({
        _id: "61b4a80c6b1b6550dd5bf056",
        userName:"Hee-Young insoko",
        password:"sovica123",
        img:"https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixid=Mnwy...",
        country:"korea",
        color:"black",
        lifeStatus:"dead",
        reasonForPlaying:"I need money for food to my grandpa",
        playerNumber:124,
        age:43
    });


    const updateUser=(newUser)=>{
        // כאן נבצע קריאה לשרת עם היוזר החדש כדי  לעדכן אותו
        setUser({...newUser});
    }

  return (
    <div className="App">
      <Header/>
      {/* <Timer timeTimer={timeTimer}/> */}
     
      {/* <Profile user={user} funcToUpdate={updateUser}/> */}
    </div>
  );
}

export default App;
