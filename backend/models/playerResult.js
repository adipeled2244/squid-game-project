const { Schema, model } = require('mongoose');

const playerResultSchema = new Schema({
    userId: { type: String, required: true },
    gameScores: { type: Number, required: true },
    gameStatus: { type: String, required: true },
    dateTime: { type: Date },
    shape: { type: String }
}, { collection: 'playersResults' });

const PlayerResult = model('playerResult', playerResultSchema);
module.exports = PlayerResult;