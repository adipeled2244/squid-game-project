import React from 'react';
import './userCard.css'
import { GiPistolGun } from "react-icons/gi";
import { FaUndoAlt } from "react-icons/fa";
export function UserCard({user}) {  
    // user ={
    //     _id: "61b4a80c6b1b6550dd5bf056",
    //     userName:"Hee-Young insoko",
    //     password:"sovica123",
    //     img:"https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixid=Mnwy...",
    //     country:"korea",
    //     color:"black",
    //     // lifeStatus:"waiting to be killed",
    //     lifeStatus:"dead",
    //     reasonForPlaying:"I need money for food to my grandpa",
    //     playerNumber:124,
    //     age:43
    // }
    
    const role=()=>{
        if(user.color=="red") return "Manager"
        if(user.color=="blue") return "Player"
    }
    return <div className={"card"}>
                    <div className="imgBx">
                        <img src={user.img} alt="user image" />
                    </div>
                    <div className="details">
                        <div className="content">
                            <h2 className={user.color+'-text' +' role'}>{role()}</h2><br />
                            <span><span className={user.color+'-text' +" name"}>Name:</span> {user.userName}</span><br />
                            <span><span className={user.color+'-text'}>Age:</span>  {user.age} </span><br />
                            <span><span className={user.color+'-text'}>Country:</span> {user.country}</span><br />
                            {user.color=='blue' && <span><span className={user.color+'-text'}>Status:</span> {user.lifeStatus}</span>}


                            {user.lifeStatus=="waiting to be killed" && <GiPistolGun color="white" width={20} size={30} className='kill-button gunBtn'/> }
                            {user.lifeStatus=="dead" && <FaUndoAlt  width={20} color="white" size={30} className='alive-button aliveBtn'/>}
                            
                        </div>
                </div>
        </div>
}

