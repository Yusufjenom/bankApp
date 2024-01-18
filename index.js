const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { connectDB } = require('./database/db');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const {ErrorHandler} = require('./middleware/ErrorHandler');
const methodOverride = require('method-override');

const app = express();

const port = process.env.PORT || 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/api/v1', userRouter);
app.use('/api/v2', adminRouter);

//Error handler middleware has to be the last middleware on your stack
app.use(ErrorHandler);

(async function () {
    try {
        await connectDB()
        app.listen(port, () => console.log(`server running on localhost port ${port}`));
    }
    catch (err) {
        console.log(err.message)
    }
})()