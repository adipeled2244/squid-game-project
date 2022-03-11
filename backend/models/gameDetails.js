const { Schema, model } = require('mongoose');

const gameDetailsSchema = new Schema({
    gameName:{ type: String},
    dateTime: { type: Date}
}, { collection: 'gamesDetails' });

const GameDetails = model('gameDetails', gameDetailsSchema);
module.exports = GameDetails;