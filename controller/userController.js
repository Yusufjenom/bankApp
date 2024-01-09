const { UserModel } = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { genAccNum } = require('../utils/genAccountNum');

const period = 60 * 60 * 24;
//SIGN UP A USER

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
        res.status(400).json({
            success: false,
            msg: err.message
        })
    }
};
 
module.exports = { signupUser, loginUser };