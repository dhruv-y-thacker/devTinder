const express = require('express')
const { connectDB } = require('./config/database');
const User = require('./models/User');
app = express();


app.use(express.json());

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