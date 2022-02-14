const { Router } = require('express');
const { authController } = require('../controllers/authController');
const authRouter = new Router();

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.signup);

module.exports = { authRouter };