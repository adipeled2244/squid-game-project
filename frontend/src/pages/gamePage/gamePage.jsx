import React, { useState } from 'react';
import {Timer} from '../../components/timer/timer'
import {GameShapesSelection} from '../../components/gameShapesSelection/gameShapesSelection'
import {Game} from '../../components/game/game'
import {WaitingToBeKilled} from '../waitingToBeKilled/waitingToBeKilled'
import { Heaven } from '../heaven/heaven';

export function GamePage({user,timeTimer,isTimeEnd,setIsTimeEnd, userShape ,setUserShape, userMsgEndGame ,addPlayerResultAfterGame,setUserMsgEndGame,updateStatusUserAfterGame}) {
  const gamePage = {
    position:'fixed',
    overflow:'hidden'
  }

  return <div >
    {user.lifeStatus=='waiting to be killed' &&  <WaitingToBeKilled />}
    {user.lifeStatus=='dead' &&  <Heaven />}
    {user.lifeStatus=='alive' && !isTimeEnd && <Timer style={gamePage} timeTimer={timeTimer} setIsTimeEnd={setIsTimeEnd}/>}
    {user.lifeStatus=='alive' &&!userShape && isTimeEnd && <GameShapesSelection style={gamePage}  setUserShape={setUserShape}/>} 
    {user.lifeStatus=='alive' && userShape && isTimeEnd && <Game userId={user._id} style={gamePage} addPlayerResultAfterGame={addPlayerResultAfterGame} shape={userShape} userMsgEndGame={userMsgEndGame} setUserMsgEndGame={setUserMsgEndGame} updateStatusUserAfterGame={updateStatusUserAfterGame}/>}
  </div>;
}
