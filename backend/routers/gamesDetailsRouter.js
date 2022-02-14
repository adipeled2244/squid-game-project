const { Router } = require('express');
const { gamesDetailsController } = require('../controllers/gamesDetailsController');
const gamesDetailsRouter = new Router();

gamesDetailsRouter.get('/', gamesDetailsController.getGames);
gamesDetailsRouter.get('/:gameId', gamesDetailsController.getGameDetailsById);
gamesDetailsRouter.patch('/:gameId', gamesDetailsController.updateGameDetails);


module.exports = { gamesDetailsRouter };