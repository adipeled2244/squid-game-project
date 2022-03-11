import './profile.css'
import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function Profile({user,funcToUpdate,onDeleteUser,onLogout}) {

    const [isEditMode, setisEditMode] = useState(false);
    const [copyUser, setcopyUser] = useState({...user});
    
    useEffect(()=>{
        return ()=>{
            setcopyUser({});
        }
    },[]);

    useEffect(()=>{
        if(user){
            setcopyUser({...user});
        }
    },[user]);

    const handleChangeInput =({target})=>{
        const field = target.name;
        const value =target.value;
        setcopyUser(prevCopyUser=>({...prevCopyUser, [field]:value}));
    }

    const getUserTitle = ()=>{
        if(user.color=='red') {return 'MANAGER'}
        if(user.color=='blue') {return 'PLAYER'}
        if(user.color=='black') {return 'BIG BOSS'}
    }

    const changeEditMode=()=>{
        if(isEditMode){
            funcToUpdate(copyUser);
        }
        setisEditMode(!isEditMode);
    }
     
    if(!user){
        window.location.href='/'
    }
  
    return   <section className="profile">
                <div id="green-header">
                </div>
                <div className="profile-wrapper">
                    <div className="typeUser">
                        <h2 className={user.color}>{getUserTitle()}</h2>
                    </div>
                    <div className="profile-image">
                    { user.color=='blue' && user.lifeStatus=='dead' && <div className="dead none">Dead</div>}
                    { !user && <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEVDRkuSi37YAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=" alt="profile pic" />}
                    { user && <img src={user.img} alt="profile pic" />}
                    { user.color=='blue' && <div className="playerNumber">
                                                <h2>{user.playerNumber}</h2>
                                            </div>}
                    </div>
                    <div className="profile-username">
                        <span id="profile-username-first">{user.userName}</span>
                    </div>
                    <div className="profile-intro">
                        {!isEditMode&&<span className={user.color +" profile-intro-designation age"} >{user.age}</span>}
                        {isEditMode&& <input onChange={handleChangeInput} className="w3-input w3-hover-green ageinput input" value={copyUser.age} name="age" type="text"/>}
                        {!isEditMode&&<span className={user.color + " profile-intro-designation country" } >{user.country}</span>}
                        {isEditMode && <input onChange={handleChangeInput} className="w3-input w3-hover-green countryinput input margin-top" name="country" value={copyUser.country} type="text" />}
                    </div>
                    { user.color=='blue'&& 
                    <div className="reasonForPlay">
                        <div className="px-4 ">
                            <h2 className="mb-0">Reason for playing:</h2>
                            <div className=" rounded shadow-sm bg-light-color-about">
                                {isEditMode && <textarea onChange={handleChangeInput} rows="3" cols="27" value={copyUser.reasonForPlaying} className=" reasoninput input" name="reasonForPlaying"></textarea>}
                                {!isEditMode && <p className="font-italic mb-0 reason">{user.reasonForPlaying}</p>}
                            </div>
                        </div>
                    </div>
                    }
                    <div className="editBtn editProfile" onClick={changeEditMode}><b>{isEditMode? 'Save':'Edit'}</b></div>
                    {
                        user.color=='blue' &&
                        <div className="quit" title="Delete account" onClick={()=>{onDeleteUser(user._id)}}><b>Quit Game</b></div>
                    }
                    <NavLink  to='/'> 
                            <div className="logout" onClick={onLogout}><b>Logout</b></div>
                    </NavLink>
                </div>
            </section>;
}
