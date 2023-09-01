const { Router } = require('express');
const { register, login,userAllProduct } = require('../controller/auth');
const { authorizationMiddleware } = require('../middleware/auth.js');

const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/users', authorizationMiddleware({ roles: ['admin'] }), userAllProduct);

module.exports = authRouter