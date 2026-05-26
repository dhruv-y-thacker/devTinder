const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        "firstName": {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 60,
        },
        "lastName": {
            type: String,
        },
        "emailId": {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
        },
        "password": {
            type: String,
            required: true,
        },
        "age": {
            type: Number,
            required: true,
            min: 18,
        },
        "gender": {
            type: String,
            required: true,
            validate(value){
                if(!['male','female','others'].includes(value)){
                    throw new Error("Gender data not valid");
                    
                }
            }
        },
        "photoUrl": {
            type: String,
            default: "https://www.vecteezy.com/free-vector/default-user"
        },
        "about": {
            type: String,
            default: "This is a default about for the user !"
        },
        "skills": {
            type: [String],
        },
    },
    {
        timestamps: true,
    },
);

module.exports=mongoose.model("User", userSchema);