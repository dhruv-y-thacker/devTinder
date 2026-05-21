const express = require('express')

app = express();

app.use('/',(req,resp)=>{
    resp.send("hellow and welcome to out server and this is home route")
})

app.use('/nam',(req,resp)=>{
    resp.send("Namastebhailog")
})

app.listen(3000);