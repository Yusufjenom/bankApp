const adminRouter = require('express').Router();
const {verifyAdmin} = require('../middleware/adminAuth');

const {loginAdmin, 
        signUpAdmin,
        Credit,
        createTransactionPin
      } = require('../controller/adminContoller')


adminRouter.post('/admin-login', loginAdmin);

adminRouter.post('/admin-signup', signUpAdmin);

adminRouter.put('/credit-account', verifyAdmin, Credit);
//2718569043

adminRouter.put('/create-admin-pin', verifyAdmin, createTransactionPin);




module.exports = adminRouter;