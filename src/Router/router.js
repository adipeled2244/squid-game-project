import React from 'react';
import {Routes,Route} from 'react-router-dom';
import { GamePage } from '../pages/gamePage/gamePage.jsx';
import { PlayerResults } from '../pages/playerResults/playerResults.jsx';
import { Profile } from '../pages/profile/profile.jsx';
import { SignUpLogin } from '../pages/signUp-Login/signupLogin.jsx';
import { UsersCards } from '../pages/usersCards/usersCards.jsx';


export const ReactRouter=()=>{
    return(
        <>
           <Header/>
           <Routes>
                <Route exact path="/" element={<GamePage/>}/>
                <Route exact path="/profile" element={<Profile/>}/>
                <Route exact path="/Login" element={<SignUpLogin/>}/>
                <Route exact path="/users" element={<UsersCards/>}/>
                <Route exact path="/results" element={<PlayerResults/>}/>
            </Routes>
        </>
    )
}
