const adminRouter = require('express').Router();

const {loginAdmin, signUpAdmin} = require('../controller/adminContoller')


adminRouter.post('/admin-login', loginAdmin);

adminRouter.post('/admin-signup', signUpAdmin);


module.exports = adminRouter;