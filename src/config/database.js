const mongoose = require('mongoose')


const connectDB = async () => {
 await mongoose.connect('mongodb+srv://alldhruvthacker_db_user:7bNKRXah3rZ8cf00@cluster0.iagoyjb.mongodb.net/devTinder')
}

module.exports={
    connectDB
}

