const { Router } = require('express');
const { playersResultsController } = require('../controllers/playersResultsController');
const playersResultsRouter = new Router();

playersResultsRouter.get('/', playersResultsController.getPlayersResults);
playersResultsRouter.get('/:userId', playersResultsController.getPlayerResultsByUserId);
playersResultsRouter.post('/', playersResultsController.addPlayerResult);

module.exports = { playersResultsRouter };