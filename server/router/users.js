const express = require("express");
const router = express.Router();

const DB = require("../database/database");
const ErrorClass = DB.ErrorClass;
const Users = DB.User;

const { v4 } = require("uuid");
const SendEmail = require("../util/SendEmail");
const { encrypt, validatePassword, isDevMode } = require("../util/util");

// use to create a new account, will verify username and password ahead of creation
router.post("/create", (req, res) => {
    const { username, password } = req.body;

    Users.validateUserName({ username: username }, (err, result) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                success: false,
                message: err.message
            });
        } else {
            const validUsername = result;
            const validPassword = validatePassword(password);

            if (!validUsername.valid || !validPassword.valid) {
                res.send({
                    statusCode: res.statusCode,
                    success: false,
                    message: "Fail to valid username and password!",
                    detail: {
                        username: validUsername,
                        password: validPassword
                    }
                });
            } else {
                Users.register({ username, password: encrypt(password) }, (err, msg) => {
                    if (err instanceof ErrorClass) {
                        res.status(err.status).send({
                            statusCode: err.status,
                            success: false,
                            message: err.message
                        });
                    } else {
                        res.send({
                            statusCode: res.statusCode,
                            success: true,
                            message: msg,
                            detail: {
                                username: validUsername,
                                password: validPassword
                            }
                        });
                    }
                });
            }
        }
    });
});

// valid username or password one at a time
router.post("/validate", (req, res) => {
    const { username, password } = req.body;

    if (username) {
        Users.validateUserName({ username }, (err, result) => {
            if (err instanceof ErrorClass) {
                res.status(err.status).send({
                    statusCode: err.status,
                    success: false,
                    message: err.message
                });
            } else {
                res.send({
                    statusCode: res.statusCode,
                    success: result.valid,
                    message: result.valid ? "Success" : "Fail to valid username",
                    detail: result
                });
            }
        });
    } else if (password) {
        const validPassword = validatePassword(password);
        res.send({
            statusCode: res.statusCode,
            success: validPassword.valid,
            message: validPassword.valid ? "Success" : "Fail to valid password",
            detail: validPassword
        });
    } else {
        res.send({
            statusCode: res.statusCode,
            success: false,
            message: "Missing key infomation",
        });
    }
});

// login user account, will keep a login secrete in their session as identity for modify user's data
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const { mode } = req.query;
    const withSecrete = (isDevMode() && (mode === "developer"));

    Users.login({ username, password: encrypt(password) }, (err, msg) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                success: false,
                message: err.message
            });
        } else {
            req.session.username = msg.username;
            req.session.login_secrete = msg.login_secrete;

            delete msg.status;
            if (!withSecrete) {
                delete msg.login_secrete;
            }

            res.send({
                statusCode: res.statusCode,
                success: true,
                detail: msg
            });
        }
    });
});

// logout user's account, destory their session
router.post("/logout", (req, res) => {
    let { username, login_secrete } = req.session;
    username = username || req.body.username;
    login_secrete = login_secrete || req.body.login_secrete;

    Users.logout({ username, login_secrete }, (err, msg) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                success: false,
                message: err.message
            });
        } else {
            req.session.destroy(() => {
                res.send({
                    statusCode: res.statusCode,
                    success: true,
                });
            })
        }
    });
});

// get user's information, owner only
router.get("/info", (req, res) => {
    const { username, login_secrete } = req.session;

    if (!username || !login_secrete) {
        return res.send({
            statusCode: res.statusCode,
            success: false,
            message: "Not authorized"
        });
    }

    Users.fetch({ username, login_secrete }, (err, info) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                success: false,
                message: err.message
            });
        } else {
            res.send({
                statusCode: res.statusCode,
                success: true,
                detail: info
            });
        }
    });
});

// get user's information, if the call is not made by owner, return a public version of info
router.get("/info/:username", (req, res) => {
    const { username } = req.params;
    const { login_secrete } = req.session;

    Users.fetch({ username, login_secrete }, (err, info) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                success: false,
                message: err.message
            });
        } else {
            res.send({
                statusCode: res.statusCode,
                success: true,
                detail: info
            });
        }
    });
});

// get user's information by providing login_secrete
router.post("/info", (req, res) => {
    const { username } = req.body;
    const login_secrete = req.body.login_secrete || req.session.login_secrete || "";

    Users.fetch({ username, login_secrete }, (err, info) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                success: false,
                message: err.message
            });
        } else {
            res.send({
                statusCode: res.statusCode,
                success: true,
                detail: info
            });
        }
    });
});

// notify user a secrete
router.post("/resetPassword/:username", (req, res) => {
    const { username } = req.params;
    Users.fetchEmail({ username }, (err, msg) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                success: false,
                message: err.message
            });
        } else {
            const { email, firstname } = msg;
            const temp_secrete = v4();
            if (email) {
                SendEmail.compose_and_send_email(
                    email,
                    "Reset your password",
                    SendEmail.fillResetPasswordTemplate(temp_secrete, firstname || username),
                ).then(() => {
                    req.session.temp_secrete = temp_secrete;
                    req.session.resetPasswordLocked = true;
                    res.send({
                        statusCode: res.status,
                        success: true,
                        message: "Please check your email!"
                    });
                }).catch(err => {
                    res.send({
                        statusCode: err.status,
                        success: false,
                        message: "Cannot send you an email! Please contact Admin!"
                    });
                });
            } else {
                res.send({
                    statusCode: res.status,
                    success: false,
                    message: "We do not have your email, please contact Admin for help!"
                })
            }
        }
    })
})

// validate if given secrete is valid
router.post("/validate/password_secrete", (req, res) => {
    const { temp_secrete } = req.body;
    const matched = !!temp_secrete && (temp_secrete === req.session.temp_secrete);

    console.warn(temp_secrete, req.session.temp_secrete);

    if (matched) {
        delete req.session.resetPasswordLocked;
    }

    return res.send({
        success: matched,
        valid: matched,
        detail: {
            message: matched ? "Success" : "Not a valid secrete!"
        }
    });
})

// reset user's password
router.post("/internal/resetPassword", (req, res) => {
    const { mode } = req.params;

    if (!isDevMode() || mode !== "developer") {
        if (req.session.resetPasswordLocked || !req.session.temp_secrete) {
            return res.send({
                statusCode: 402,
                success: false,
                detail: {
                    message: "Not authoried"
                }
            });
        }
    }

    const { username, password } = req.body;
    const validPassword = validatePassword(password);
    if (!validPassword.valid) {
        res.send({
            statusCode: res.statusCode,
            success: false,
            detail: {
                message: "Fail to valid your password!",
                password: validPassword
            }
        });
        return;
    }

    Users.resetPassword({ username, password: encrypt(password) }, (err, msg) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                success: false,
                detail: {
                    message: err.message
                }
            });
        } else {
            delete req.session.temp_secrete;
            res.send({
                statusCode: res.statusCode,
                success: true,
            });
        }
    });
});

// update user's info (except password and user name)
router.put("/update", (req, res) => {
    const { changes } = req.body;

    let { username, login_secrete } = req.session;
    username = username || req.body.username;
    login_secrete = login_secrete || req.body.login_secrete;

    Users.update({ username, login_secrete, changes }, (err, msg) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                message: err.message,
                success: false,
            });
        } else {
            res.send({
                statusCode: res.statusCode,
                success: true,
            });
        }
    });
});

module.exports = router;