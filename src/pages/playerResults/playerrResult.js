import './userResult.css'
import React, { useState,useEffect } from 'react';

export function PlayerResults({user}) {

    userResults =[
        {   _id:34343434,
        userId:"61b4a80c6b1b6550dd5bf055",
        gameScores:8,
        gameStatus:"lose",
        dateTime:'2021-12-24T09:06:30.564+00:00',
        shape:"umbrella"
    }
    ]
    
    return   
    <section class="gameResults">
        <div class="container">
            {userResults.map(result => {
                return `
                    <div className="card">
                            <div className="imgBx">
                                <img src="/assets/images/${result.shape}.png" alt="shape">
                            </div>
                            <div className="details">
                                <div className="content">
                                    <span><span className="pink"><b>Scores</b><br></span> ${result.gameScores}/100</span><br><br>
                                    <span><span className="pink"><b>Game Time</b><br></span> ${new Date(result.dateTime).toLocaleString()}</span>
                                </div>
                        </div>
                    </div>
                    `;
                })
        }
        </div>
    </section>
}


