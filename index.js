const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { connectDB } = require('./database/db');
const userRouter = require('./routes/userRoutes');

const app = express();

const port = process.env.PORT || 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/v1', userRouter);


(async function () {
    try {
        await connectDB()
        app.listen(port, () => console.log(`server running on localhost port ${port}`));
    }
    catch (err) {
        console.log(err.message)
    }
})()