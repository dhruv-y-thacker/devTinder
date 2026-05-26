const express = require('express')
const { connectDB } = require('./config/database');
const User = require('./models/User');
app = express();


app.use(express.json());

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

app.get('/feed', async(req,res)=>{

    try(

    ) catch
})

app.post('/signUp',async (req,res)=>{
    console.log(req.body);

    const user = new User(req.body);

    try{
        await user.save();
        res.send("user added successfully");
    } catch(err){
        res.status(400).send("Error saving the user "+ err.message)
    }
})

connectDB().then(()=>{
    console.log('Database connected succesfully and now server will now listen');
    app.listen(3000 , ()=> {
        console.log('server started listneing');
    });

}).catch((err)=>{
    console.log(err.message)
})