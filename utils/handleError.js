
function errorHandler(err){
  let errors = {email: "", password: ""}

  if(err.message == 'invalid password'){
    errors.password = 'you have entered a wrong password'
    return errors
  }

  if(err.message == 'invalid email'){
    errors.email = 'this email does not exist'
    return errors
  }

  return errors;
};

module.exports = {errorHandler};