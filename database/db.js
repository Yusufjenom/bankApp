const mongoose = require('mongoose');

async function connectDB (){
    try{
      await mongoose.connect(process.env.MONGO_DB_URL)
      console.log('connected to db successfully')
    }
    catch(err){
        console.log(err.message)
    }
};

module.exports = {connectDB};