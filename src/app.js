const express = require('express')

app = express();

const { adminAuth, userAuth } = require('../middlewares/auth.js')



app.use('/user/login', (req,res)=>{
    res.send("no user auth middleware required thats why decalred avove --app.use('/user', userAuth)-- it as express will go line by line for route matching")
})

app.use('/admin', adminAuth)

app.use('/user', userAuth)

app.use('/nam',(req,res,next)=>{
        // res.send("Namastebhailog")
        console.log("came here 1")
        next()
    },
    (req,res)=>{
        console.log("came here 2")
        res.send("namaste bahilog");
    }
)

app.use('/admin/getAllData', (req,res)=>{
    console.log("aata future mein ruk... middleware ka chakkar laga ke aata")
    res.send("after adminAuth only it came here brooo so he is admin only")
})


app.use('/user/getData',(req,res)=> {
    // res.send ("after middleware came here");
    //or below handled by the app.usemethod
    // throw new Error ("some unwanted errrr whcih is not in try catch block... always beeter to write in try catch but if you miss then it will go in that 4th argument err")
    try{
        throw new Error ('good way use try catch first')
    } catch(err){
        console.log(err)
        res.status(500).send("bro bro handled by try catch good way than global catch using that --app.use('/', (err, req, res, next)=>{}--")
    }
})

// if you are using this then it will match only if error arrises and not every time
// This is an Express error-handling middleware.
// It only executes when next(err) is called or an error is thrown.
// It does NOT run for every incoming request automatically.
// order of pasing this is madatory this 
// should be wriiten at the end of the code only
app.use('/', (err, req, res, next)=>{
    if(err){
        console.log(err);
        res.status(500).send("something went wrong")
    }
})

app.listen(3000);