const userRouter = require('express').Router();
const {signupUser, loginUser} = require('../controller/userController');


//SIGN UP A USER
userRouter.post('/signup-user', signupUser);

userRouter.post('/login-user', loginUser);



module.exports = userRouter;