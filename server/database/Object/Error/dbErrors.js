const { stat } = require("fs");

class DBError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

module.exports = {
    DBError,
    FAILED_AUTH: new DBError(200, "Wrong email and password combination!"),
    NO_USER: new DBError(200, "The user was not found!"),
    MISSING_CRITICAL_INFO: new DBError(200, "Missing key information!"),
    UNAUTHORIZED: new DBError(401 , "Account unauthorized!"),
    LOCKED_ACCOUNT: new DBError(401, "Account being locked, please reset your password!")
}