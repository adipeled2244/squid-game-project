import './playerResults.css'
import { PlayerResult } from '../../components/playerResult/playerResult';
import noGamesImg from './nogames.svg'
import React from 'react';

export function PlayerResults({userResults}) {
    
    if(userResults.length==0){
        return <section className="gameResults">
                        <div className="container">
                        <img src={noGamesImg} alt="" /><br/>
                        <h2 className="whiteColor">Hey player, You don't play yet</h2>`;
                </div>
            </section> 
    }

    return <section className="gameResults">
        <div className="container">
            {userResults.map(result => {
                return <PlayerResult  playerResult={result} key={result._id}/>
                })
            }
        </div>
    </section>



}


