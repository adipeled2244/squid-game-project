import React, { useEffect, useState } from 'react';
import {Routes,Route, Navigate } from 'react-router-dom';
import { Header } from '../components/header/header.jsx';
import { GamePage } from '../pages/gamePage/gamePage.jsx';
import { PlayerResults } from '../pages/playerResults/playerResults.jsx';
import { Profile } from '../pages/profile/profile.jsx';
import { SignUpLogin } from '../pages/signUp-Login/signupLogin.jsx';
import { UsersCards } from '../pages/usersCards/usersCards.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageNotFound } from '../pages/pageNotFound/pageNotFound.jsx';
import {Heaven} from '../pages/heaven/heaven.jsx';

export const ReactRouter = () => {
    const [timeTimer, setTimeTimer] = useState('');
    const [isTimeEnd, setIsTimeEnd] = useState(false);
    const [userShape, setUserShape] = useState('');
    const [userMsgEndGame, setUserMsgEndGame] = useState('');
    const [currMoney,setCurrMoney] =useState(0);

    const [users,setUsers] =useState(null);
    const [playerResults,setPlayerResults] =useState(null);

    const getCurrentUser = ()=>{
        const userString = localStorage.getItem('User');
        if(userString){
            return JSON.parse(userString);
        }
        else {
            return null;
        }
    }

    const [user, setUser] = useState(getCurrentUser());


    const saveCurrentUser = (user)=>{
        setUser((prevUser)=>{
            const userUpdate = {...prevUser,...user};
            const userString = JSON.stringify(userUpdate);
            localStorage.setItem('User', userString);
            return userUpdate});
        
    }

    useEffect(()=>{
        if(user){
            if(user.color=='red'){
                getUsers('blue');
            }
            if(user.color=='black'){
                getUsers('blue,red')
            }
            if(user.color=='blue'){
                getClosetGameTime();
                getPlayerResults(user._id);
            }

        }
    }, [user]);


    const notifyError = (txt) => toast.error(txt);

    const callNotifyError = async (err) => {
        if (err.status >= 500) {
            notifyError('Error from server');
        } else {

            const errJSON = await err.json();
            notifyError(errJSON.error);
        }
    }


    const login = async (user) => {
        let loginResponse;
        try {
           loginResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            });
        
        } catch (err) {
            callNotifyError(err);
        }

        if (loginResponse.status !== 200) { 
            callNotifyError(loginResponse)
        } else {
            const user =await loginResponse.json();
            saveCurrentUser(user);
            if(user.color!=='blue'){
                window.location.href='/users'
            }
            else{
                window.location.href='/game'
            }
        }
    }


    const signup = async (newuser) => {
        if(newuser.color=='blue'){
           newuser.shape=''
           newuser.playerNumber=Math.floor(Math.random()*(999-100+1)+100);
           newuser.lifeStatus='alive'
        }

        let addResultResponse;
        try {
            addResultResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newuser)
            });
        } catch (err) {
            callNotifyError(err);
        }

        if (addResultResponse.status !== 200) { 
            callNotifyError(addResultResponse)
        } else {
            const user = await addResultResponse.json();
            saveCurrentUser(user);
            if(user.color!=='blue'){
                window.location.href='/users'
            }
            else{
                window.location.href='/game'
            }
        }
    }

    const logoutUser = ()=>{
        localStorage.clear();
        setUser(null);

    }

    const updateUser = async (userToUpdate) => {
        let updateResponse;
        try {
           updateResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/users/${userToUpdate._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userToUpdate)
            });
        
        } catch (err) {
            callNotifyError(err);
        }

        if (updateResponse.status !== 200) { 
            callNotifyError(updateResponse)
        } else {
            saveCurrentUser(userToUpdate);
        }
    }

     const quitGame= async(idToDelete)=>{
        let deleteResponse;
        try {
            deleteResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/users/${idToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
        
        } catch (err) {
            callNotifyError(err);
        }

        if (deleteResponse.status !== 200) {
            callNotifyError(deleteResponse)
        } else {
            logoutUser();
          
        }
    }


     const getUsers=async(userType)=>{
        let usersResponse;
        try {
            usersResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/users?colors=${userType}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
        
        } catch (err) {
            callNotifyError(err);
        }

        if (usersResponse.status !== 200) { 
            callNotifyError(usersResponse)
        } else {
            const usersResponseJson =await usersResponse.json();
            setUsers(usersResponseJson)
        }
    }

   const getClosetGameTime= async()=>{
    let closetTimeResponse;
    try {
         closetTimeResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/gamesDetails?closer=true`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
        });
    }
    catch (err) {
        callNotifyError(err);
    }
      if (closetTimeResponse.status !== 200) { 
        callNotifyError(closetTimeResponse);
      }
      else{
          const closetTimeJson = await closetTimeResponse.json();
        setTimeTimer(closetTimeJson.dateTime);
      }
   }

      const addPlayerResultAfterGame=async(newResult)=>{
        newResult.userId = user._id;
        newResult.dateTime = Date.now();
         let  playerResultsResponse;
         try {
             playerResultsResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/playersResults`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json;charset=utf-8'
                 },
                 body: JSON.stringify(newResult)
             });
         } catch (err) {
             callNotifyError(err);
         }
 
         if (playerResultsResponse.status !== 200) { 
             callNotifyError(playerResultsResponse)
         } else {
            const playerResultsResponseJson =await playerResultsResponse.json();
            setPlayerResults((prevReasults)=>{return [...prevReasults,playerResultsResponseJson]})
         }
        }


         useEffect(async ()=>{
                await getMoney();
        },[]);

         const getMoney= async()=>{
            let blueDeadPlayersResponse;
            try {
                blueDeadPlayersResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/users?colors=blue&lifeStatus=dead`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
            
            } catch (err) {
                callNotifyError(err);
            }

            if (blueDeadPlayersResponse.status !== 200) { 
                callNotifyError(blueDeadPlayersResponse)
            } else {
                const blueDeadPlayersResponseJson =await blueDeadPlayersResponse.json();
                const totalMoney = (blueDeadPlayersResponseJson.length) * 10;
                setCurrMoney(totalMoney);
            }
        }
       
        const getPlayerResults =async (playerId) => {
        let playerResultResponse;
        try {
            playerResultResponse = await fetch(`https://squid-game-api-game.herokuapp.com/api/playersResults/${playerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
        
        } catch (err) {
            callNotifyError(err);
        }

        if (playerResultResponse.status !== 200) { 
            callNotifyError(playerResultResponse)
        } else {
            const playerResultResponseJson =await playerResultResponse.json();
            setPlayerResults(playerResultResponseJson)
        }
    }

    const updateStatusPlayerLife= (status, userId=user._id)=>{
        updateUser({lifeStatus:status, _id:userId})
    }
    

    return( <>
           <Header user={user} money={currMoney} />
           <Routes>
                <Route exact path="/" element={<SignUpLogin onSignup={signup} onLogin={login}/>}/>
                <Route  path="/game" element={ !user ? (<SignUpLogin onSignup={signup} onLogin={login}/>) :  (user.color!='blue'? (<PageNotFound />) : (timeTimer &&  <GamePage isTimeEnd={isTimeEnd} setIsTimeEnd={setIsTimeEnd} updateStatusUserAfterGame={updateStatusPlayerLife} user={user} timeTimer={timeTimer} addPlayerResultAfterGame={addPlayerResultAfterGame} userShape={userShape} setUserShape={setUserShape} userMsgEndGame={userMsgEndGame} setUserMsgEndGame={setUserMsgEndGame}/>))}/>
                <Route  path="/profile" element={!user ?  (<SignUpLogin onSignup={signup} onLogin={login}/>) : (<Profile user={user} funcToUpdate={updateUser} onLogout={logoutUser} onDeleteUser={quitGame}/>) }/>
                <Route  path="/users" element={!user ? (<SignUpLogin onSignup={signup} onLogin={login}/>) : (user.color !='blue'? (users &&  <UsersCards users={users}/> ) : (<PageNotFound />))} />
                <Route  path="/results" element={!user? (<SignUpLogin onSignup={signup} onLogin={login}/>) :  (user.color != 'blue' ? (<PageNotFound />) :  (playerResults && <PlayerResults userResults={playerResults} />))}/>
                <Route path='/404' element={<PageNotFound />} />
                <Route path='*' element={<Navigate replace to="/404" />} />
                <Route path='heaven' element={<Heaven />} />
            </Routes>
            <ToastContainer />
        </>
    )

}