const { Router } = require('express');
const { authController } = require('../controllers/authController');
const authRouter = new Router();

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.signup);
// authRouter.get('/logout', authController.logout);

module.exports = { authRouter };