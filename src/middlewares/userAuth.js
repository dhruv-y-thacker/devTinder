const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req,res,next) => {

    const token = req.cookies.token;
    const decoded = jwt.verify(token, 'Hello@123');
    const user = await User.findById(decoded.userId);

    if(!user) {
        res.status(401).send("unthourised brooo")
    } else {
        console.log("middleware");
        req.user = user;
        next();
    }
}

module.exports = {
    userAuth
}
