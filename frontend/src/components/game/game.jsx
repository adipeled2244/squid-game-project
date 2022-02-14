import React,{useRef, useEffect} from 'react';
import './game.css'

export function Game({userId, shape, userMsgEndGame , setUserMsgEndGame, addPlayerResultAfterGame,updateStatusUserAfterGame}) {
    const canvasRef = useRef(null)
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
                addPlayerResultAfterGame({gameScores:0, gameStatus:'lose',shape} );
                setTimeout(() => {
                    updateStatusUserAfterGame(userId);
                }, 3000);
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
                addPlayerResultAfterGame({gameScores:totalScore, gameStatus:'win',shape} );
                setUserMsgEndGame("Winner");
            } else {
                setTimeout(() => {
                    updateStatusUserAfterGame(userId);
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
