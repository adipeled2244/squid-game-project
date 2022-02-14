const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String ,default: "https://i.ytimg.com/vi/D-zhr3Ii8MU/sddefault.jpg"  },
    country: { type: String, required: true },
    color: { type: String },
    age:{type:Number,required: true},
    lifeStatus: { type: String },
    reasonForPlaying: { type: String },
    playerNumber: {type:Number},
    shape: { type: String }
}, { collection: 'users' });

const User = model('user', userSchema);
module.exports = User;