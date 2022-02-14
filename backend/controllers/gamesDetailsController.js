const GameDetails = require('../models/gameDetails');

exports.gamesDetailsController = {
    async getGameDetailsById(req, res) {
        let gameDetailsresults;
        const { gameId } = req.params;
        try {
            gameDetailsresults = await GameDetails.findOne({ _id: gameId });
        } catch (err) {
            res.status(500).send({ error: `Error get Game: ${gameId}  : ${err}` });
            return;
        }
        if (gameDetailsresults) {
            res.status(200).json(gameDetailsresults);
        } else {
            res.status(404).json({ error: `Game not found` });
        }
    },
    async getGames(req, res) {
        let games;
        const { closer } = req.query;
        try {
            if (closer) {
                games = await GameDetails.find({});
                games = games.sort(((a, b) => a.dateTime - b.dateTime))[0];
            } else {
                games = await GameDetails.find({});
            }

        } catch (err) {
            res.status(500).json({ error: `Error get all games details : ${err}` });
            return;
        }
            res.status(200).json(games);
    },
    async updateGameDetails(req, res) {
        let gameUpdateDetails;

        try {
            gameUpdateDetails = await GameDetails.updateOne({ _id: req.params.gameId }, req.body);
        } catch (err) {
            res.status(500).json({ error: `Error update game ${req.params.gameId} : ${err}` });
            return;
        }
        if (gameUpdateDetails.matchedCount == 1) {
            res.status(200).json({ message: "The game updated" });
        } else {
            res.status(404).json({ error: "Game not found" });
        }

    }
};