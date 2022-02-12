import React, { useState } from 'react';
import {Timer} from '../../components/timer/timer'
import {GameShapesSelection} from '../../components/gameShapesSelection/gameShapesSelection'
import {Game} from '../../components/game/game'
export function GamePage({timeTimer,isTimeEnd,setIsTimeEnd, userShape ,setUserShape, userMsgEndGame ,addPlayerResultAfterGame,setUserMsgEndGame,updateStatusUserAfterGame}) {
  


  const gamePage = {
    position:'fixed',
    overflow:'hidden'
  }

  return <div >
    {!isTimeEnd && <Timer style={gamePage} timeTimer={timeTimer} setIsTimeEnd={setIsTimeEnd}/>}
    {!userShape && isTimeEnd && <GameShapesSelection style={gamePage}  setUserShape={setUserShape}/>} 
    {userShape && isTimeEnd && <Game  style={gamePage} addPlayerResultAfterGame={addPlayerResultAfterGame} shape={userShape} userMsgEndGame={userMsgEndGame} setUserMsgEndGame={setUserMsgEndGame} updateStatusUserAfterGame={updateStatusUserAfterGame}/>}
  </div>;
}
