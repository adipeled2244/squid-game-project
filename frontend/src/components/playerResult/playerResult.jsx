import './playerResult.css'
import React from 'react';

const circle = require('./shapeImages/circle.png')
const triangle = require('./shapeImages/triangle.png')
const umbrella = require('./shapeImages/umbrella.png')

export function PlayerResult({playerResult}) {    

    const getShapeImg = ()=>{
        if(playerResult.shape=='circle') {return circle;}
        if(playerResult.shape=='triangle') {return triangle;}
        if(playerResult.shape=='umbrella') {return umbrella;}
    }

    return <div className="card">
                    <div className="imgBx">
                        <img src={getShapeImg()} alt="shape" />
                    </div>
                    <div className="details">
                        <div className="content">
                            <span><span className="pink"><b>Scores</b><br /></span> {playerResult.gameScores}/100, {playerResult.gameStatus}</span><br /><br />
                            <span><span className="pink"><b>Game Time</b><br /></span> {new Date(playerResult.dateTime).toLocaleString()}</span>
                        </div>
                </div>
        </div>
}


