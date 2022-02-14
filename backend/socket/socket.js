const User = require('../models/user');


module.exports = function (http) {
    const io = require('socket.io')(http);
    // const { updateChatFromSocket } = require('./updateChat');

    // chat logic
    io.on('connection',  (socket) =>{
        // socket.on('join',(userId)=>{
        //     // socket.join(userId);
        // })
        socket.on('makeDead', (userId)=>{
            console.log('someone kill');
            try{
               User.updateOne({ _id: userId }, {lifeStatus:'dead'},()=>{
                //    io.to(userId).emit('youDead');
                   io.emit('afterKill',userId);
               }) 
            }
            catch(err){
                throw err;
            }
        })
        
        socket.on('makeAlive', (userId)=>{
            console.log('someone alive');
            try{
               User.updateOne({ _id: userId }, {lifeStatus:'alive'},()=> {
                //    io.to(userId).emit('youAlive');
                   io.emit('afterAlive',userId);
                });
            }
            catch(err){
                throw err;
            }
        })
        socket.on('makeWaitingToBeKilled', (userId)=>{
            console.log('makeWaitingToBeKilled');
            try{
               User.updateOne({ _id: userId }, {lifeStatus:'waiting to be killed'},()=> {
                // io.to(userId).emit('youWaitingToBeKilled');
                   io.emit('afterWaitingToBeKilled',userId);
                   console.log('makeWaitingToBeKilled','after');

                });
            }
            catch(err){
                throw err;
            }
        })
        
    });
    return io;
}