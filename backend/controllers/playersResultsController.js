const PlayerResult = require('../models/playerResult.js');
// remove moment dron json 

exports.playersResultsController = {
    async getPlayerResultsByUserId(req, res) {
        let playerResults;
        const { userId } = req.params;
        try {
            playerResults = await PlayerResult.find({ userId }).sort({ _id: -1 });
        } catch (err) {
            res.status(500).send({ error: `Error get Player: ${userId} games results : ${err}` });
            return;
        }
        res.status(200).json(playerResults);
    },
    async getPlayersResults(req, res) {
        let playersResults;
        try {
            playersResults = await PlayerResult.find({});
        } catch (err) {
            res.status(500).json({ error: `Error get all players Results : ${err}` });
            return;
        }
        res.status(200).json(playersResults);

    },
    async addPlayerResult(req, res) {
        const playerResult = new PlayerResult(req.body);
        try {
            let playerResultToSave = await playerResult.save();
            res.status(200).json({ message: "The result added" });
        } catch (err) {
            res.status(500).json({ error: ` ${err}` });
            return;
        }
    }
};