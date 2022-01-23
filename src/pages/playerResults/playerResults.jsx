import './playerResults.css'
import { PlayerResult } from '../../components/playerResult/playerResult';
import React, { useState, useEffect } from 'react';

export function PlayerResults({userResults}) {
    
    return <section className="gameResults">
        <div className="container">
            {userResults.map(result => {
                return <PlayerResult  playerResult={result} key={result._id}/>
                })
            }
        </div>
    </section>

}


