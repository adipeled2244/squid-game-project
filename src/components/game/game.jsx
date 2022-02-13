import React,{useRef, useEffect,useState} from 'react';

import './game.css'
export function Game({shape, userMsgEndGame , setUserMsgEndGame, addPlayerResultAfterGame,updateStatusUserAfterGame}) {

    const canvasRef = useRef(null)
    // let pixelsShape;
    
    let mouseDown = false;
    let startedTurn = false;
    let brokeShape = false;
    let prevX = null;
    let prevY = null;
    let pixelsShape = 0;
    let canvas;
    let ctx;
    
    const draw = ()=>{
        if(shape=='circle'){drawCircle()}
        if(shape=='triangle'){drawTriangle()}
        if(shape=='umbrella'){drawUmbrella()}
    }

    useEffect(()=>{
        canvas = canvasRef.current;
        ctx = canvas.getContext('2d');
        canvas.height = 350;
        canvas.width = 350;
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        draw();
    },[])
    
    // useEffect(() => {
    //     canvas = canvasRef.current;
    //     ctx = canvas.getContext('2d');
    //     canvas.height = 350;
    //     canvas.width = 350;
    //     ctx.lineWidth = 20;
    //     ctx.lineCap = 'round';
    //     draw();
    // },[draw])


    
const drawTriangle = ()=> {
    ctx.strokeStyle = 'rgb(66, 10, 0)';
    ctx.beginPath();
    ctx.moveTo(175, 75);
    ctx.lineTo(275, 240);
    ctx.lineTo(75, 240);
    ctx.closePath();
    ctx.stroke();
    pixelsShape = getPixelAmount(66, 10, 0);
}

const drawCircle=() =>{
    ctx.strokeStyle = 'rgb(66, 10, 0)';
    ctx.beginPath();
    ctx.arc(175, 175, 100, 0 * Math.PI, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    pixelsShape = getPixelAmount(66, 10, 0);
}

const drawUmbrella=() =>{
    ctx.strokeStyle = 'rgb(66, 10, 0)';

    drawArc(175, 165, 120, 0, 1); 
    drawArc(83, 165, 26, 0, 1);
    drawArc(136, 165, 26, 0, 1);
    drawArc(218, 165, 26, 0, 1);
    drawArc(269, 165, 26, 0, 1);

    ctx.moveTo(162, 165);
    ctx.lineTo(162, 285);
    ctx.stroke();
    drawArc(212, 285, 50, 0, 1, false);
    drawArc(246, 285, 16, 0, 1);
    drawArc(211, 286, 19, 0, 1, false);
    ctx.moveTo(192, 285);
    ctx.lineTo(192, 169);
    ctx.stroke();

    pixelsShape = getPixelAmount(66, 10, 0);
}

const drawArc=(x, y, radius, start, end, counterClockwise = true)=> {
    ctx.beginPath();
    ctx.arc(x, y, radius, start * Math.PI, end * Math.PI, counterClockwise);
    ctx.stroke();
}


const getPixelAmount=(r, g, b) =>{
    if(ctx){
        const pixelsData = ctx.getImageData(0, 0, 350,350);
        const allPixels = pixelsData.data.length;;
        let amount = 0;
        for (let i = 0; i < allPixels; i += 4) {
            if (pixelsData.data[i] === r &&
                pixelsData.data[i + 1] === g &&
                pixelsData.data[i + 2] === b) {
                amount++;
            }
        }
    return amount;
    }
}


const handleMouseDown= ()=> {

    if (!startedTurn) {
        if(!userMsgEndGame){
            mouseDown = true;
            startedTurn = true;
        } 
    } 
}

const handleMouseMove=({clientX,clientY})=> {
    if(canvas){
         const bounds = canvas.getBoundingClientRect();
        const x = clientX - bounds.left;
        const y = clientY - bounds.top;
        if (mouseDown) {
            paint(x, y);
        }
    } 
}


const getPixelColor =(x, y) => {
         const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
        let index = Math.floor(y) * (350 * 4) + Math.floor(x) * 4;
        return {
            r: pixels.data[index],
            g: pixels.data[index + 1],
            b: pixels.data[index + 2],
            a: pixels.data[index + 3]
        };   
}


const paint = (x, y) => {
    let color = getPixelColor(x, y);
    if ((color.r === 0 && color.g === 0 && color.b === 0) || brokeShape) {
        if (!brokeShape) {
            // addGameResult(userId, 0, 'lose', currShape);
            addPlayerResultAfterGame({gameScores:0, gameStatus:'lose',shape} );
            setTimeout(() => {
                updateStatusUserAfterGame('waiting to be killed');
            }, 3000);
            // winnerLoserModal.style.display = 'flex';
            // winnerLoserModalh2.innerHTML = "I come to kill you now!"
            // uploadDeadImg();
            setUserMsgEndGame("Loser");
        }
        brokeShape = true;
        return;
    } else {
        ctx.strokeStyle = 'rgb(247, 226, 135)';
        ctx.beginPath();
        if (prevX > 0 && prevY > 0) {
            ctx.moveTo(prevX, prevY);
        }
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        prevX = x;
        prevY = y;
    }
    ctx.lineWidth = 20;
}

const handleMouseUp = ()=> {
    if(!userMsgEndGame){
        mouseDown = false;
        evaluatePixels();
    }
}


const evaluatePixels =()=> {
    if (!brokeShape) {
        const pixelsTrace = getPixelAmount(247, 226, 135);
        let drawColorRatio = pixelsTrace / pixelsShape;
        const shapePixelsLeft = getPixelAmount(66, 10, 0);
        let undrawColorRatio = shapePixelsLeft / pixelsShape;
        let undrawColorRatioComplement = 1 - undrawColorRatio;

        const totalScore = Math.round(((drawColorRatio + undrawColorRatioComplement) / 2) * 100);

        if (drawColorRatio >= 0.5 && drawColorRatio <= 1 && undrawColorRatio < 0.5) {
            // winnerLoserModal.style.display = 'flex';
            // winnerLoserModalh2.innerHTML = "Winner";
            // addGameResult(userId, totalScore, 'win', currShape)
            addPlayerResultAfterGame({gameScores:totalScore, gameStatus:'win',shape} );
            setUserMsgEndGame("Winner");
        } else {
            // winnerLoserModal.style.display = 'flex';
            // winnerLoserModalh2.innerHTML = "I come to kill you now!"
            // addGameResult(userId, totalScore, 'lose', currShape)
            // updateStatusUserAfterGame(userId, 'dead');
            // uploadDeadImg();
            setTimeout(() => {
                updateStatusUserAfterGame('waiting to be killed');
            }, 3000);
            addPlayerResultAfterGame({gameScores:totalScore, gameStatus:'lose',shape} );
            setUserMsgEndGame("Loser");
        }
    }
}


const handelTouchMove = (e)=>{
    const touch = e.touches[0];
    const mouseEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY
    };
    handleMouseMove(mouseEvent);
}

  return <section  className="gamePage">
  <div className="touchCursor"></div>
  {userMsgEndGame &&  <div className="modalWinnerLoser">
                            <h2>{userMsgEndGame}</h2>
                    </div>}
  <div className="dead-alive-img">
  </div>
  <div className="container container-canvas">
      <canvas ref={canvasRef} onTouchStart={handleMouseDown} onTouchEnd ={handleMouseUp} onTouchMove={handelTouchMove}  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} />
  </div>
  </section>;
}



// // ............................ game page ............................

// const buttonTriangle = document.querySelector('.game__button-triangle');
// const buttonCircle = document.querySelector('.game__button-circle');
// const buttonUmbrella = document.querySelector('.game__button-umbrella');
// const gameStart = document.querySelector('.game');
// const winnerLoserModal = document.querySelector('.modalWinnerLoser');
// const winnerLoserModalh2 = document.querySelector('.modalWinnerLoser h2');

// let mouseDown = false;
// let startedTurn = false;
// let brokeShape = false;
// let prevX = null;
// let prevY = null;
// let pixelsShape = 0;
// let currShape = null;


// buttonTriangle.addEventListener('click', drawTriangle);
// buttonCircle.addEventListener('click', drawCircle);
// buttonUmbrella.addEventListener('click', drawUmbrella);





// function getPixelAmount(r, g, b) {
//     const pixelsData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const allPixels = pixelsData.data.length;;
//     let amount = 0;
//     for (let i = 0; i < allPixels; i += 4) {
//         if (pixelsData.data[i] === r &&
//             pixelsData.data[i + 1] === g &&
//             pixelsData.data[i + 2] === b) {
//             amount++;
//         }
//     }
//     return amount;
// }

// canvas.addEventListener('mousemove', handleMouseMove);
// canvas.addEventListener('mousedown', handleMouseDown);
// canvas.addEventListener('mouseup', handleMouseUp);

// function handleMouseDown(e) {
//     if (!startedTurn) {
//         mouseDown = true;
//         startedTurn = true;
//     } 
// }

// function handleMouseMove(e) {
//     const bounds = canvas.getBoundingClientRect();
//     const x = e.clientX - bounds.left;
//     const y = e.clientY - bounds.top;
//     if (mouseDown) {
//         paint(x, y, e);
//     }
// }

// function paint(x, y, e) {
//     let color = getPixelColor(x, y);
//     if ((color.r === 0 && color.g === 0 && color.b === 0) || brokeShape) {
//         if (!brokeShape) {
//             addGameResult(userId, 0, 'lose', currShape);
//             updateStatusUserAfterGame(userId, 'dead');
//             winnerLoserModal.style.display = 'flex';
//             winnerLoserModalh2.innerHTML = "I come to kill you now!"
//             uploadDeadImg();
//         }
//         brokeShape = true;
//         return;
//     } else {
//         ctx.strokeStyle = 'rgb(247, 226, 135)';
//         ctx.beginPath();
//         if (prevX > 0 && prevY > 0) {
//             ctx.moveTo(prevX, prevY);
//         }
//         ctx.lineTo(x, y);
//         ctx.stroke();
//         ctx.closePath();
//         prevX = x;
//         prevY = y;
//     }
//     ctx.lineWidth = 20;

// }

// function getPixelColor(x, y) {
//     const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
//     let index = Math.floor(y) * (350 * 4) + Math.floor(x) * 4;
//     return {
//         r: pixels.data[index],
//         g: pixels.data[index + 1],
//         b: pixels.data[index + 2],
//         a: pixels.data[index + 3]
//     };
// }

// function handleMouseUp() {
//     mouseDown = false;
//     evaluatePixels();
// }

// function evaluatePixels() {
//     if (!brokeShape) {

//         const pixelsTrace = getPixelAmount(247, 226, 135);

//         let drawColorRatio = pixelsTrace / pixelsShape;
//         const shapePixelsLeft = getPixelAmount(66, 10, 0);
//         let undrawColorRatio = shapePixelsLeft / pixelsShape;
//         let undrawColorRatioComplement = 1 - undrawColorRatio;

//         const totalScore = Math.round(((drawColorRatio + undrawColorRatioComplement) / 2) * 100);

//         if (drawColorRatio >= 0.5 && drawColorRatio <= 1 && undrawColorRatio < 0.5) {
//             winnerLoserModal.style.display = 'flex';
//             winnerLoserModalh2.innerHTML = "Winner";
//             addGameResult(userId, totalScore, 'win', currShape)
//         } else {
//             winnerLoserModal.style.display = 'flex';
//             winnerLoserModalh2.innerHTML = "I come to kill you now!"
//             addGameResult(userId, totalScore, 'lose', currShape)
//             updateStatusUserAfterGame(userId, 'dead');
//             uploadDeadImg();
//         }
//     }
// }

// canvas.addEventListener('touchstart', function(e) {
//     e.preventDefault();
//     const touch = e.touches[0];
//     const mouseEvent = new MouseEvent('mousedown', {
//         clientX: touch.clientX,
//         clientY: touch.clientY
//     });
//     canvas.dispatchEvent(mouseEvent);
// }, false);


// canvas.addEventListener("touchmove", function(e) {
//     e.preventDefault();
//     const touch = e.touches[0];
//     const mouseEvent = new MouseEvent('mousemove', {
//         clientX: touch.clientX,
//         clientY: touch.clientY
//     });
//     canvas.dispatchEvent(mouseEvent);
// }, false);

// canvas.addEventListener('touchend', function() {
//     const mouseEvent = new MouseEvent('mouseup', {});
//     canvas.dispatchEvent(mouseEvent);
// }, false);

// const body = document.querySelector('body');
// body.addEventListener('touchmove', (ev) => {
//     setPointer(ev);
// });
// body.addEventListener('touchstart', (ev) => {
//     setPointer(ev);
// });


// function setPointer(e) {
//     const touchCursor = document.querySelector('.touchCursor');
//     const bounds = canvas.getBoundingClientRect();
//     touchCursor.classList.add('cursor');
//     touchCursor.style.top = e.touches[0].clientY - bounds.top + 40 + 'px';
//     touchCursor.style.left = e.touches[0].clientX - bounds.left + 'px';
// }

// const addGameResult=(userId, gameScores, gameStatus, currShape)=> {
//     const endGameTime = Date.now();
//     $.ajax({
//         url: `https://squid-game-api-22.herokuapp.com/api/playersResults`,
//         type: 'POST',
//         data: { userId, gameScores, gameStatus, shape: currShape, dateTime: endGameTime },
//         error: (response)=>{
//             if(response.status == 500){
//                 alert(`cann't add user result`);
//             }
//             else{
//                 alert(response.responseJSON['error']);            
//             }
//         }
//     });
// }

// const uploadDeadImg = ()=>{
//     setTimeout(() => {
//         const constainerImg =document.querySelector('.dead-alive-img');
//         constainerImg.innerHTML = '<img src="./assets/images/finalgif.gif" alt="shoot">';      
//             setTimeout(() => {
//                 constainerImg.innerHTML ='';
//                 winnerLoserModalh2.innerText = "Dead";
//             }, 5500);
//     }, 2500);
// }


// const updateStatusUserAfterGame = (userId, lifeStatus)=> {
//     $.ajax({
//         url: `https://squid-game-api-22.herokuapp.com/api/users/${userId}`,
//         type: 'PATCH',
//         data: { userId, lifeStatus },
//         success: () => {
//             user.lifeStatus = lifeStatus;
//             showMoney();
//             renderUser(user);
//         },
//         error: (response)=>{
//             if(response.status == 500){
//                 alert(`cann't update user after game`);
//             }
//             else{
//                 alert(response.responseJSON['error']);            
//             }
//         }
//     });
// }

// const showMoney = () => {
//     $.ajax({
//         url: `https://squid-game-api-22.herokuapp.com/api/users?colors=blue&lifeStatus=dead`,
//         type: 'GET',
//         success: (deadUsers) => {
//             if (deadUsers) {
//                 const totalMoney = (deadUsers.length) * 10;
//                 const moneySpan = document.querySelector('.pigMoney span');
//                 if (moneySpan){
//                     moneySpan.innerText = totalMoney;
//                 }
//         }},
//         error: (response)=>{
//             if(response.status == 500){
//                 alert(`cann't update money`);
//             }
//             else{
//                 alert(response.responseJSON['error']);            
//             }
//         }
//     });
// }
