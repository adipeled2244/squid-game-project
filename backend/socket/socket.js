const User = require('../models/user');

module.exports = function (http) {
    const io = require('socket.io')(http);
    io.on('connection',  (socket) =>{
        socket.on('makeDead', (userId)=>{
            try{
               User.updateOne({ _id: userId }, {lifeStatus:'dead'},()=>{
                   io.emit('afterKill',userId);
               }) 
            }
            catch(err){
                throw err;
            }
        })
        socket.on('makeAlive', (userId)=>{
            try{
               User.updateOne({ _id: userId }, {lifeStatus:'alive'},()=> {
                   io.emit('afterAlive',userId);
                });
            }
            catch(err){
                throw err;
            }
        })
        socket.on('makeWaitingToBeKilled', (userId)=>{
            try{
               User.updateOne({ _id: userId }, {lifeStatus:'waiting to be killed'},()=> {
                   io.emit('afterWaitingToBeKilled',userId);
                });
            }
            catch(err){
                throw err;
            }
        })
    });
    return io;
}