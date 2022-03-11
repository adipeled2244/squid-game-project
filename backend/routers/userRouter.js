const { Router } = require('express');
const { usersController } = require('../controllers/usersController');
const usersRouter = new Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:userId', usersController.getUser);
usersRouter.get('/names/:userName', usersController.checkIfuserNameNotExist);
usersRouter.patch('/:userId', usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);

module.exports = { usersRouter };