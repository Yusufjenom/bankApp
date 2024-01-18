const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendMail } = require('../utils/sendMail');
const { CatchErrorFunc } = require('../utils/CatchErrorFunc');
const { AdminModel } = require('../model/adminModel');
const { HandleError } = require('../utils/error');

const period = 60 * 60 * 24;
const signUpAdmin = CatchErrorFunc(async (req, res) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newAdmin = AdminModel.create({ name, email, password: hashedPassword });

    res.status(201).json({
        success: true,
        newAdmin
    });

});

const loginAdmin = CatchErrorFunc(async (req, res) => {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });
    if (user) {
        const isPassword = await bcrypt.compare(password, user.password);
        if (isPassword) {
            await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: period },
                async (err, token) => {
                    if (err) {
                        throw new HandleError(400, err.message, 400)
                    }
                    res.cookie('adminToken', token, { maxAge: 1000 * period, httpOnly: true });
                    res.status(200).json({
                        success: true,
                        user
                    })
                })
        }else{
            throw new HandleError(400, "invalid password", 404)
        }
       
    }else{
        throw new HandleError(400, "invalid email", 404)
    }

   
});


module.exports = {
    signUpAdmin,
    loginAdmin
}