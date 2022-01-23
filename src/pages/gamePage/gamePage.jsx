import React, { useState } from 'react';
import {Timer} from '../../components/timer/timer'
import {GameShapesSelection} from '../../components/gameShapesSelection/gameShapesSelection'
import {Game} from '../../components/game/game'
export function GamePage({timeTimer, userShape ,setUserShape, userMsgEndGame ,setUserMsgEndGame}) {
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  return <>
    {!isTimeEnd && <Timer timeTimer={timeTimer} setIsTimeEnd={setIsTimeEnd}/>}
    {!userShape && isTimeEnd && <GameShapesSelection setUserShape={setUserShape}/>} 
    {userShape && isTimeEnd && <Game shape={userShape} userMsgEndGame={userMsgEndGame} setUserMsgEndGame={setUserMsgEndGame}/>}
  </>;
}
