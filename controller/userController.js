const { UserModel } = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { genAccNum } = require('../utils/genAccountNum');
const { CatchErrorFunc } = require('../utils/CatchErrorFunc');
const { HandleError } = require('../utils/error');
const { sendMail } = require('../utils/sendMail');

const period = 60 * 60 * 24;
//SIGN UP A USER
const loginForm = CatchErrorFunc(async (req, res) => {
    res.status(200).render('loginUser');
})

const signupForm = CatchErrorFunc(async (req, res) => {
    res.status(200).render('signupUser');
})

const homePage = CatchErrorFunc(async (req, res) => {
    res.status(200).render('home');
}
)


const signupUser = CatchErrorFunc(async (req, res) => {

    const { firstname, lastname, email, password, address, tel } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        throw new HandleError(400, 'user with this email already exist', 400)
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
})


const loginUser = CatchErrorFunc(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        const correctPassword = await bcrypt.compare(password, user.password);

        if (correctPassword) {
            await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: period },
                async (err, token) => {
                    if (err) {
                        throw new HandleError(400, err.message, 400)
                    }
                    let text = `<h1>User Logged Into Cohort 3 Bank Application</h1>
                 <p> Hello ${user.firstname}, you have just logged into your account,
                 if you did not authorize this login kindly report to our support team
                 </p>
                 `
                    await sendMail(user.email, "Successful Login", text);
                    res.cookie('userToken', token, { maxAge: 1000 * period, httpOnly: true })
                    res.status(200).json({
                        success: true,
                        user,

                    })
                })
        }
        else {
            throw new HandleError(process.env.WRONG_PASSWORD, 'invalid password', 400)
        }
    }
    else {
        throw new HandleError(400, 'invalid email', 400)
    }
})


const logoutUser = CatchErrorFunc(async (req, res) => {
    res.cookie('userToken', "", { maxAge: 0 });
    res.redirect('/api/v1/login-user');
})


const displayUpdatePasswordEmail = CatchErrorFunc(async (req, res) => {
    res.status(200).render('resetPasswordEmail');
});

const submitEmailForPasswordUpdate = CatchErrorFunc(async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user) {
        throw new HandleError(400, "user not found", 400)
    }
    await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 5 },
        async (err, token) => {
            if (err) {
                throw new HandleError(400, err.message, 400)
            }
            let text = `http://localhost:5000/api/v1/update-password/${user._id}/${token}`
            console.log(text)
            await sendMail(user.email, "Reset Password Link", text);
        });

});

const getUpdatePassword = CatchErrorFunc(async (req, res) => {
    const { id, token } = req.params;
    res.status(200).render('updatePassword', { id, token });
});

const postUpdatedPassword = CatchErrorFunc(async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log(password, id, token);

    await jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
        if (err) {
            throw new HandleError(400, err.message, 400)
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const updatedPassword = await UserModel.findOneAndUpdate({ _id: id }, {
            password: hashedPassword
        });

        res.status(202).redirect('/api/v1/login-user');
    })
});

const generatePin = CatchErrorFunc(async (req, res) => {
    const {pin} = req.body;
    const userToken = req.cookies.userToken;
    const verifiedToken = await jwt.verify(userToken, process.env.JWT_SECRET);
    const user = await UserModel.findByIdAndUpdate(verifiedToken.id, {
        pin 
    })
    res.status(200).json({
        success: true,
        message: "your pin was updated successfully"
    })
});

const creditCustomer = CatchErrorFunc(async (req, res) => {
    const { amount, accountNum, pin } = req.body;
    const userToken = req.cookies.userToken;
    const verifiedToken = await jwt.verify(userToken, process.env.JWT_SECRET);
    const user = await UserModel.findById(verifiedToken.id);
    const customerToCredit = await UserModel.findOne({ accountNum });
      
    if (Number(pin) === Number(user.pin)) {
        if (customerToCredit) {
            //Crediting
            const senderBalance = user.accountBalance;
            const recepientBalance = customerToCredit.accountBalance;

            if (senderBalance > amount) {
                const newBalance = Number(amount) + Number(recepientBalance)
                const newSenderBalance = Number(senderBalance) - Number(amount);
                const updatedRecipientAccount = await UserModel.findOneAndUpdate({ accountNum }, {
                    accountBalance: newBalance
                });
                const updatedSenderAccount = await UserModel.findByIdAndUpdate(verifiedToken.id, {
                    accountBalance: newSenderBalance
                });
                await UserModel.updateOne({ email: user.email }, {
                    beneficiary: { accountName: `${customerToCredit.firstname} ${customerToCredit.lastname}`, accountNum: customerToCredit.accountNum }
                })
                res.status(200).json({
                    success: true,
                    message: "Your transfer was successful",
                    updatedSenderAccount
                })
            } else {
                throw new HandleError(400, "insuffient funds", 400)
            }
        } else {
            throw new HandleError(400, "account number does not exist", 400)
        }
    }else{
        throw new HandleError(400, "incorrect pin", 400);
    }

});


const resetPin = CatchErrorFunc(async (req, res) => {
    const {oldPin, newPin} = req.body;
    const userToken = req.cookies.userToken;
    const verifiedToken = await jwt.verify(userToken, process.env.JWT_SECRET);
    const us = await UserModel.findById(verifiedToken.id);
    if(Number(oldPin) === us.pin){
        const user = await UserModel.findByIdAndUpdate(verifiedToken.id, {
            pin : newPin
        })
        res.status(200).json({
            success: true,
            message: "pin reset was successful"
        })
    }else{
        throw new HandleError(400, "wrong pin try again", 400)
    }
    
})

module.exports = {
    signupUser,
    loginUser,
    loginForm,
    signupForm,
    homePage,
    logoutUser,
    displayUpdatePasswordEmail,
    submitEmailForPasswordUpdate,
    getUpdatePassword,
    postUpdatedPassword,
    creditCustomer,
    generatePin,
    resetPin
};