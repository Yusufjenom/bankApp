const {HandleError} = require('../utils/error');

function ErrorHandler(error, req, res, next){
    let errors = {email: "", password: ""}
   if(error instanceof HandleError){
    if(error.message == 'invalid password'){
        errors.password = 'you have entered a wrong password'
        return res.json({
            success: false,
            error: errors
        })
      }
    
      if(error.message === 'invalid email'){
        errors.email = 'this email does not exist'
        return res.json({
            success: false,
            error: errors
        })
      }
   }

   return res.status(400).json({
    success: false,
    error: err.message
})
};

module.exports = {ErrorHandler}