const validator = require('validator');

function validateSignUpData(firstName, lastName, emailId, password, age, gender) {
    if(!firstName || !lastName || !emailId || !password || !age || !gender){
        throw new Error("All fields are required for sign up");
    }

    if(!validator.isEmail(emailId)){
        throw new Error("Invalid email format");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 6 characters long and include a number and a special character { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }");
    }
}

function validateLoginData(emailId, password) {
    if(!emailId || !password){
        throw new Error("EmailId and password are required for login");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid email format");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 6 characters long and include a number and a special character { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }");
    }
}


module.exports = {
    validateSignUpData,
    validateLoginData,
}