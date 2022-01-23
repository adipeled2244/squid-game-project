import logo from './logo.svg';
import './app.css';
import { Header } from '../components/header/header';
import React, { useState } from 'react';
import {Profile} from '../pages/profile/profile'
import {PlayerResults} from '../pages/playerResults/playerResults'
import {GameShapesSelection} from '../components/gameShapesSelection/gameShapesSelection'
import {Game} from '../components/game/game'
import {GamePage} from '../pages/gamePage/gamePage'

function App() {
    const [timeTimer, setTimeTimer] = useState('2022-01-23T17:46:00.726+00:00');
    const [userShape, setUserShape] = useState('');
    const [userMsgEndGame, setUserMsgEndGame] = useState('');

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

    const getUserResults = ()=>{
      // לקבל איידי בפונקציה
      // קריאת אגקס לשרת כדי לקבל תוצאות משחקים של יוזר אחד
      return [
        {
            _id: 34343434,
            userId: "61b4a80c6b1b6550dd5bf055",
            gameScores: 8,
            gameStatus: "lose",
            dateTime: '2021-12-24T09:06:30.564+00:00',
            shape: "circle"
        }, {
            _id: 34343435,
            userId: "61b4a80c6b1b6550dd5bf055",
            gameScores: 8,
            gameStatus: "lose",
            dateTime: '2021-12-24T09:06:30.564+00:00',
            shape: "triangle"
        }
    ]  
    }


    const updateUser=(newUser)=>{
        // כאן נבצע קריאה לשרת עם היוזר החדש כדי  לעדכן אותו
        setUser({...newUser});
    }

  return (
    <div className="App">
      <Header/>
      {/* <Profile user={user} funcToUpdate={updateUser}/> */}
      {/* <PlayerResults userResults={getUserResults()} /> */}
      {/* <Timer timeTimer={timeTimer}/> */}
    {/* <GameShapesSelection/> */}
      {/* <Game  shape={'umbrella'}/> */}
      <GamePage timeTimer={timeTimer} userShape={userShape} setUserShape={setUserShape} userMsgEndGame={userMsgEndGame} setUserMsgEndGame={setUserMsgEndGame}/>
    </div>
  );
}

export default App;
