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
    res.send ("after middleware came here");
})

app.listen(3000);