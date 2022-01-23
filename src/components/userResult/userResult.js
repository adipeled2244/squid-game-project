import './userResult.css'
import React, { useState,useEffect } from 'react';

export function UserResult({user}) {

    comconst userResults =[]
    
    
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


