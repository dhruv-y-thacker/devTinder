const adminAuth = (req,res,next)=>{
    const token = 'xyz'
    let isAdmin = false

    if(token === 'xyz'){
        isAdmin = true;
    }

    if(!isAdmin){
        res.status(401).send('not authorised')
    }
    else{
        console.log("middleware");
        next();
    }
};


const userAuth = (req,res,next) => {
    const token = 'yyy'
    let isAuthUser = false;

    if (token === 'yyy'){
        isAuthUser=true;
    }

    if(!isAuthUser){
        res.status(401).send("unthourised brooo")
    } else{
        console.log("middleware");
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}
