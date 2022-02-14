import React, { useEffect, useState } from 'react';
import {Routes,Route,Navigate } from 'react-router-dom';
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
import {WaitingToBeKilled} from '../pages/waitingToBeKilled/waitingToBeKilled.jsx';

import io from 'socket.io-client';
// import { GiUfo } from 'react-icons/gi';
let socket;

// const history =  require('history').createBrowserHistory();

const BASE_URL =  window.location.origin;
// const BASE_URLSocket =  'https://socket-squid-game.herokuapp.com';

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
        if (err.status < 500) { 
            const errJSON = await err.json();
            notifyError(errJSON.error);              
        }
    }

    socket = io(BASE_URL, {
        transports: ['websocket'],
        upgrade: false
    });
  
    //   socket.on('connect',  ()=>{
    //     //  if(user && user.color=='blue'){
    //         // socket.emit('join', user._id);
    //      }
    //   });

    const login = async (user) => {
        let loginResponse;
        try {
           loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
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
            socket.emit('waiting-to-be-killed', 'noy connect', 'from noy')
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
            addResultResponse = await fetch(`${BASE_URL}/api/auth/signup`, {
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
            // if(user.color!=='blue'){
            //     window.location.href='/users'
            // }
            // else{
            //     window.location.href='/game'
            // }
        }
    }

    const logoutUser = ()=>{
        localStorage.clear();
        setUser(null);

    }

    const updateUser = async (userToUpdate) => {
        let updateResponse;
        try {
           updateResponse = await fetch(`${BASE_URL}/api/users/${userToUpdate._id}`, {
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
            console.log(userToUpdate);
            saveCurrentUser(userToUpdate);
        }
    }

     const quitGame= async(idToDelete)=>{
        let deleteResponse;
        try {
            deleteResponse = await fetch(`${BASE_URL}/api/users/${idToDelete}`, {
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
            usersResponse = await fetch(`${BASE_URL}/api/users?colors=${userType}`, {
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
         closetTimeResponse = await fetch(`${BASE_URL}/api/gamesDetails?closer=true`, {
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
             playerResultsResponse = await fetch(`${BASE_URL}/api/playersResults`, {
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
            // const playerResultsResponseJson =await playerResultsResponse.json();
            getPlayerResults(user._id);            
         }
        }


         useEffect(async ()=>{
                await getMoney();
        },[]);

         const getMoney= async()=>{
            let blueDeadPlayersResponse;
            try {
                blueDeadPlayersResponse = await fetch(`${BASE_URL}/api/users?colors=blue&lifeStatus=dead`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                console.log(blueDeadPlayersResponse);
            
            } catch (err) {
                callNotifyError(err);
            }

            if (blueDeadPlayersResponse && blueDeadPlayersResponse.status !== 200) { 
                callNotifyError(blueDeadPlayersResponse)
            } else if(blueDeadPlayersResponse){
                const blueDeadPlayersResponseJson =await blueDeadPlayersResponse.json();
                const totalMoney = (blueDeadPlayersResponseJson.length) * 10;
                setCurrMoney(totalMoney);
            }
        }
       
        const getPlayerResults =async (playerId) => {
        let playerResultResponse;
        try {
            playerResultResponse = await fetch(`${BASE_URL}/api/playersResults/${playerId}`, {
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

    const updateStatusPlayerLife= (status, userId)=>{
        updateUser({lifeStatus:status, _id:userId})
        console.log(userId);
    }
    
    const makeUserDead = (userId) =>{
        // updateStatusPlayerLife('dead', userId);
        socket.emit('makeDead', userId );
    }

    const makeUserAlive = (userId) =>{
        // updateStatusPlayerLife('alive', userId);
        socket.emit('makeAlive', userId );
    }

    const updateStatusWaitingToBeKilled = (userId)=>{
        // updateStatusPlayerLife('waiting to be killed', userId);
        socket.emit('makeWaitingToBeKilled', userId );  
    }

    // socket.on('youDead', (userId)=>{
    //      // make sound scream
    //     if(user && user._id==userId){
    //         setUser((prevUser)=>{return{...prevUser,lifeStatus:'dead'}});
    //     }
    // })
    // socket.on('youWaitingToBeKilled', (userId)=>{
    //      // make sound scream
    //     if(user&& user._id==userId){
    //         setUser((prevUser)=>{return{...prevUser,lifeStatus:'waiting to be killed'}});
    //     }
    // })

//     socket.on('youAlive', (userId)=>{
//         // make sound scream
//         if(user && user._id==userId){
//             setUser((prevUser)=>{return{...prevUser,lifeStatus:'alive'}});
//             setUserShape('');
//             setUserMsgEndGame('')
//         }
       
//    })
    
    socket.on('afterKill', (userId)=>{
        if(user && user._id==userId&& user.color=='blue'){
            console.log('after id change');
            setUser((prevUser)=>{return{...prevUser,lifeStatus:'dead'}});
        }
        getMoney();
        if(users && user && user.color!='blue'){
            const userDead = users.find((currUser)=>currUser._id==userId);
            userDead.lifeStatus ='dead';
            setUsers([...users]);
        }
    })

    socket.on('afterAlive',(userId)=>{
        if(user && user._id==userId){
            setUser((prevUser)=>{return{...prevUser,lifeStatus:'alive'}});
            setUserShape('');
            setUserMsgEndGame('')
        }
        getMoney();
        if(users && user && user.color!='blue'){
            const userAlive = users.find((currUser)=>currUser._id==userId);
            userAlive.lifeStatus ='alive';
            setUsers([...users]);
        }
    })
    socket.on('afterWaitingToBeKilled',(userId)=>{
        if(user&& user._id==userId){
            setUser((prevUser)=>{return{...prevUser,lifeStatus:'waiting to be killed'}});
        }
        if(users && user && user.color!='blue'){
            console.log('userWaitingToBeKilled -before',userWaitingToBeKilled);
            const userWaitingToBeKilled = users.find((currUser)=>currUser._id==userId);
            console.log('after',userWaitingToBeKilled);
            userWaitingToBeKilled.lifeStatus ='waiting to be killed';
            console.log('after',userWaitingToBeKilled);
            setUsers([...users]);
        }
    })

    return( <>
           <Header user={user} money={currMoney} />
           <Routes>
                <Route exact path="/" element={!user ?  (<SignUpLogin onSignup={signup} onLogin={login} />) : (user.color!='blue' ? (users &&  <UsersCards userConnect={user} makeUserAlive={makeUserAlive} makeUserDead={makeUserDead} users={users}/> ): ( (timeTimer &&  <GamePage isTimeEnd={isTimeEnd} setIsTimeEnd={setIsTimeEnd} updateStatusUserAfterGame={updateStatusWaitingToBeKilled} user={user} timeTimer={timeTimer} addPlayerResultAfterGame={addPlayerResultAfterGame} userShape={userShape} setUserShape={setUserShape} userMsgEndGame={userMsgEndGame} setUserMsgEndGame={setUserMsgEndGame}/>)))  }/>
                <Route  path="/game" element={ !user ? (<SignUpLogin onSignup={signup} onLogin={login}/>) :  (user.color!='blue'? (<PageNotFound />) : (timeTimer &&  <GamePage isTimeEnd={isTimeEnd} setIsTimeEnd={setIsTimeEnd} updateStatusUserAfterGame={updateStatusWaitingToBeKilled} user={user} timeTimer={timeTimer} addPlayerResultAfterGame={addPlayerResultAfterGame} userShape={userShape} setUserShape={setUserShape} userMsgEndGame={userMsgEndGame} setUserMsgEndGame={setUserMsgEndGame}/>))}/>
                <Route  path="/profile" element={!user ?  (<SignUpLogin onSignup={signup} onLogin={login}/>) : (<Profile user={user} funcToUpdate={updateUser} onLogout={logoutUser} onDeleteUser={quitGame}/>) }/>
                <Route  path="/users" element={!user ? (<SignUpLogin onSignup={signup} onLogin={login}/>) : (user.color !='blue'? (users &&  <UsersCards userConnect={user} makeUserAlive={makeUserAlive} makeUserDead={makeUserDead} users={users}/> ) : (<PageNotFound />))} />
                <Route  path="/results" element={!user? (<SignUpLogin onSignup={signup} onLogin={login}/>) :  (user.color != 'blue' ? (<PageNotFound />) :  (playerResults && <PlayerResults userResults={playerResults} />))}/>
                <Route path='/404' element={<PageNotFound />} />
                <Route path='heaven' element={user && user.color=='blue'?<Heaven /> : <PageNotFound />} />
                <Route path='waitingToBeKilled' element={user && user.color=='blue'? <WaitingToBeKilled /> : <PageNotFound />} />
                <Route path='*' element={<Navigate replace to="/404" />} />
            </Routes>
            <ToastContainer />
        </>
    )

}