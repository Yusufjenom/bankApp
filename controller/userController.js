const { UserModel } = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { genAccNum } = require('../utils/genAccountNum');
const {errorHandler}  = require('../utils/handleError');

const period = 60 * 60 * 24;
//SIGN UP A USER
const loginForm = async (req, res) => {
    try{
       res.status(200).render('loginUser');
    }
    catch(err){
        console.log(err.message)
    }
}

const signupForm = async (req, res) => {
    try{
       res.status(200).render('signupUser');
    }
    catch(err){
        console.log(err.message)
    }
}

const homePage = async (req, res) => {
    try{
       res.status(200).render('home');
    }
    catch(err){
        console.log(err.message)
    }
}



const signupUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, address, tel } = req.body;
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            throw new Error('user with this email already exist')
        }
        

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            address,
            tel,
            accountNum: genAccNum()
        });

        const savedUser = await newUser.save()
        res.status(201).json({
            success: true,
            savedUser
        });

    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({
            success: false,
            msg: err.message
        })

    }
};


const loginUser = async (req, res) => {
    try{
     const {email, password} = req.body;
     const user = await UserModel.findOne({email});
     if(user){
       const correctPassword = await bcrypt.compare(password, user.password);

       if(correctPassword){
          await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: period},
            async (err, token) => {
                if(err){
                    throw new Error(err.message)
                }
                res.cookie('userToken', token, {maxAge: 1000 * period, httpOnly: true})
                res.status(200).json({
                    success: true,
                    user,

                })
            })
       }
       else{
        throw new Error('invalid password')
       }
     }
     else{
        throw new Error('invalid email')
     }
     
    }
    catch(err){
        console.log(err.message)
        let error = errorHandler(err)
        res.status(400).json({
            success: false,
             error
        })
    }
};
 

const logoutUser = async (req, res) => {
    try{
      res.cookie('userToken', "", {maxAge: 0});
      res.redirect('/api/v1/login-user');
    }
    catch(err){
        console.log(err.message)
    }
}


module.exports = { signupUser, loginUser, loginForm, signupForm, homePage, logoutUser };