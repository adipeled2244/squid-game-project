import React from 'react';
import './userCard.css'
import { GiPistolGun } from "react-icons/gi";
import { FaUndoAlt } from "react-icons/fa";
export function UserCard({currUser,userConnect, makeUserDead,makeUserAlive}) {  
    
    const role=()=>{
        if(currUser.color=="red") return "Manager"
        if(currUser.color=="blue") return "Player"
    }
    return <div className={"card"}>
                    <div className="imgBx">
                        <img src={currUser.img} alt="user image" />
                    </div>
                    <div className="details">
                        <div className="content">
                            <h2 className={currUser.color+'-text' +' role'}>{role()}</h2><br />
                            <span><span className={currUser.color+'-text' +" name"}>Name:</span> {currUser.userName}</span><br />
                            <span><span className={currUser.color+'-text'}>Age:</span>  {currUser.age} </span><br />
                            <span><span className={currUser.color+'-text'}>Country:</span> {currUser.country}</span><br />
                            {currUser.color=='blue' && <span><span className={currUser.color+'-text'}>Status:</span> { currUser.lifeStatus}</span>}


                            {userConnect.color=='red' && currUser.color=='blue' && currUser.lifeStatus=="waiting to be killed" && <GiPistolGun color="white" width={20} onClick={()=>{return makeUserDead(currUser._id)}} size={30} className='kill-button gunBtn'/> }
                            {userConnect.color=='black' && currUser.color=='blue' && currUser.lifeStatus=="dead" && <FaUndoAlt onClick={()=>{return makeUserAlive(currUser._id)}} width={20} color="white" size={30} className='alive-button aliveBtn'/>}
                            
                        </div>
                </div>
        </div>
}

