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
                message: err.message
            });
        } else {
            const validUsername = result;
            const validPassword = validatePassword(password);

            if (!validUsername.valid || !validPassword.valid) {
                res.send({
                    statusCode: res.statusCode,
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
                            message: err.message
                        });
                    } else {
                        res.send({
                            statusCode: res.statusCode,
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
                    message: err.message
                });
            } else {
                res.send({
                    statusCode: res.statusCode,
                    message: result.valid ? "Success" : "Fail to valid username",
                    detail: result
                });
            }
        });
    } else if (password) {
        const validPassword = validatePassword(password);
        res.send({
            statusCode: res.statusCode,
            message: validPassword.valid ? "Success" : "Fail to valid password",
            detail: validPassword
        });
    } else {
        res.send({
            statusCode: res.statusCode,
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
                message: "Success",
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
                message: err.message
            });
        } else {
            req.session.destroy(() => {
                res.send({
                    statusCode: res.statusCode,
                    message: "Success"
                });
            })
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
                message: err.message
            });
        } else {
            res.send({
                statusCode: res.statusCode,
                message: "Success",
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
                message: err.message
            });
        } else {
            res.send({
                statusCode: res.statusCode,
                message: "Success",
                detail: info
            });
        }
    });
});

// notify user a secrete
router.get("/resetPassword/:username", (req, res) => {
    const { username } = req.params;
    Users.fetchEmail({ username }, (err, msg) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
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
                    res.send({
                        statusCode: res.status,
                        message: "Please check your email!"
                    });
                }).catch(err => {
                    res.send({
                        statusCode: err.status,
                        message: "Cannot send you an email! Please contact Admin!"
                    });
                });
            } else {
                res.send({
                    statusCode: res.status,
                    message: "We do not have your email, please contact Admin for help!"
                })
            }
        }
    })
})

// reset user's password
router.post("/internal/resetPassword/:temp_secrete", (req, res) => {
    const { temp_secrete } = req.params;
    const { mode } = req.query;

    if (isDevMode() && (mode !== "developer")) {
        if (temp_secrete !== req.session.temp_secrete) {
            return res.send({
                statusCode: 402,
                message: "Not authoried"
            });
        }
    }

    const { username, password } = req.body;
    const validPassword = validatePassword(password);
    if (!validPassword.valid) {
        res.send({
            statusCode: res.statusCode,
            message: "Fail to valid your password!",
            detail: {
                password: validPassword
            }
        });
        return;
    }

    Users.resetPassword({ username, password: encrypt(password) }, (err, msg) => {
        if (err instanceof ErrorClass) {
            res.status(err.status).send({
                statusCode: err.status,
                message: err.message
            });
        } else {
            delete req.session.temp_secrete;
            res.send({
                statusCode: res.statusCode,
                message: "Success",
                detail: {}
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
                message: err.message
            });
        } else {
            res.send({
                statusCode: res.statusCode,
                message: "Success",
                detail: {}
            });
        }
    });
});

module.exports = router;