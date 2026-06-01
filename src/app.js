const express = require('express')
const { connectDB } = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { validateSignUpData ,validateLoginData } = require('./utils/validation');
const { userAuth } = require('./middlewares/userAuth');


app = express();
app.use(cookieParser());

app.use(express.json());

app.use

app.get('/user', async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId : userEmail}) //gives the array of users of that emailId
        if(users.length<1){
            res.status(404).send("user not found !!!")
        } else{
            res.send(users)
        }
    } catch(err){
        res.status(400).send("Error saving the user "+ err.message)
    }
})

// app.get('/feed', async(req,res)=>{

//     try(

//     ) catch
// })

app.post('/signUp',async (req,res)=>{

    try{

        const {firstName, lastName, emailId, password, age, gender} = req.body;

        //validate in a seperate file in utils/validation.js
        validateSignUpData(firstName, lastName, emailId, password, age, gender);


        //generate hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashedPassword,
            age: age,
            gender: gender,
        });
        await user.save();
        res.send("user added successfully");
    } catch(err){
        res.status(400).send("Error saving the user "+ err.message)
    }
});

app.post("/login", async(req,res)=>{
    try{
        const {emailId, password} = req.body;
        //written a validation function in utils/validation.php
        validateLoginData(emailId, password);
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("User not found with the given emailId");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch){
            const token = jwt.sign({ userId: user._id }, 'Hello@123', { expiresIn: '5h' });
            res.cookie('token', token, { httpOnly: true });
            res.send("Login successful");
        }
        else {
            throw new Error("Invalid password");
        }

    } catch(err) {
        res.status(400).send("Error saving the user "+ err.message)
    }

});

app.get('/profile', userAuth, async(req,res)=>{
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, 'Hello@123');
        const user = await User.findById(decoded.userId);
        res.send(user);
    } catch(err) {
        res.status(400).send("Error fetching profile "+ err.message)
    }
});

connectDB().then(()=>{
    console.log('Database connected succesfully and now server will now listen');
    app.listen(3000 , ()=> {
        console.log('server started listneing');
    });

}).catch((err)=>{
    console.log(err.message)
})