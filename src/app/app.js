// import './app.css';
// import { Header } from '../components/header/header';
// import React, { useState } from 'react';

// import {Profile} from '../pages/profile/profile'
// import {PlayerResults} from '../pages/playerResults/playerResults'
// import {GamePage} from '../pages/gamePage/gamePage'
// import {UsersCards} from '../pages/usersCards/usersCards'
// import { SignUpLogin } from '../pages/signUp-Login/signupLogin';

// function App() {
//     const [timeTimer, setTimeTimer] = useState('2022-02-12T09:14:00.726+00:00');
//     const [userShape, setUserShape] = useState('');
//     const [userMsgEndGame, setUserMsgEndGame] = useState('');

//     const [user, setUser] = useState({
//         _id: "61b4a80c6b1b6550dd5bf056",
//         userName:"Hee-Young insoko",
//         password:"sovica123",
//         img:"https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixid=Mnwy...",
//         country:"korea",
//         color:"blue",
//         lifeStatus:"dead",
//         reasonForPlaying:"I need money for food to my grandpa",
//         playerNumber:124,
//         age:43
//     });

//     const [usersList, setUsersList] = useState(
//       [{  _id: "61b4a80c6b1b6550dd5bf0226",
//       userName:"Hee-Young insoko",
//       password:"sovica123",
//       img:"https://images.unsplash.com/photo-1523419409543-a5e549c1faa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODI1MjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzkyNjI2MDk&ixlib=rb-1.2.1&q=80&w=1080",
//       country:"korea",
//       color:"blue",
//       lifeStatus:"dead",
//       reasonForPlaying:"I need money for food to my grandpa",
//       playerNumber:124,
//       age:43},
//       ,
//       {
//         _id: "61b4a80c6b1b6550dd5bf016",
//         userName:"Hee-Young insoko",
//         password:"sovica123",
//         img:"https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixid=Mnwy...",
//         country:"korea",
//         color:"red",
//         lifeStatus:"",
//         age:43
//       },
//       {
//         _id: "61b4a80c6b1b6550dd5bf026",
//         userName:"Hee-Young insoko",
//         password:"sovica123",
//         img:"https://images.unsplash.com/photo-1567250671670-05e36d8ca38e?ixid=Mnwy...",
//         country:"korea",
//         color:"blue",
//         lifeStatus:"waiting to be killed",
//         reasonForPlaying:"I need money for food to my grandpa",
//         playerNumber:124,
//         age:43
//       }]
//     );


    
//     // const updateUser=()=>{
      
//     // }

//     // const addUser=()=>{
      
//     // }

//      // const deleteUser=()=>{
      
//     // }


//      // const getBlueUsers=()=>{
      
//     // }

//     // const getRedBlueUsers=()=>{
      
//     // }
      

//     // const getUserByUserNameAndPass=()=>{
      
//     // }



//     // const updatePlayerStatus=(id,updateUser)=>{
//        //   const updatePlayerStatusResponse = await fetch(`https://squid-game-api-22.herokuapp.com.api/users/${id}`, {
//       //     method: 'PATCH',
//       //     headers: {
//       //         'Content-Type': 'application/json;charset=utf-8'
//       //     },
//       //     body: JSON.stringify(updateUser)
//       // });
//       // const updatePlayerStatusResponseJson = await updatePlayerStatusResponse.json();
//       // console.log(`updateIdeaResponseJson: ${updateIdeaResponseJson.status}`); // "success" - Response from our service
//       // if (updatePlayerStatusResponse.status !== 200) { // Response from fetch call
//       //     // There was an error updating in DB, think what to do
//       // }
//       // else{}
//     // }

//       // const addPlayerResultAfterGame=()=>{
    
//     // }

//          // const updateMoney=()=>{
    
//     // }


//     const getUserResults = ()=>{
//       // לקבל איידי בפונקציה
//       // קריאת אגקס לשרת כדי לקבל תוצאות משחקים של יוזר אחד
//       return [
//         {
//             _id: 34343434,
//             userId: "61b4a80c6b1b6550dd5bf055",
//             gameScores: 8,
//             gameStatus: "lose",
//             dateTime: '2021-12-24T09:06:30.564+00:00',
//             shape: "circle"
//         }, {
//             _id: 34343435,
//             userId: "61b4a80c6b1b6550dd5bf055",
//             gameScores: 8,
//             gameStatus: "lose",
//             dateTime: '2021-12-24T09:06:30.564+00:00',
//             shape: "triangle"
//         }
//     ]  
//     }


//     const updateUser=(newUser)=>{
//         // כאן נבצע קריאה לשרת עם היוזר החדש כדי  לעדכן אותו
//         setUser({...newUser});
//     }

//   return (
//     <div className="App">

//       <Header/>
//       <Profile user={user} funcToUpdate={updateUser}/>
//       <PlayerResults userResults={getUserResults()} />
//       <GamePage timeTimer={timeTimer} userShape={userShape} setUserShape={setUserShape} userMsgEndGame={userMsgEndGame} setUserMsgEndGame={setUserMsgEndGame}/>
//       {<UsersCards users={usersList}/>}

//       <SignUpLogin />
//     </div>
//   );
// }

// export default App;
