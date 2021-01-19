const DB = require("../DB");
const DBError = require("../Error/dbErrors");

const UserAccount = require("./UserAccount");
const UserProfile = require("./UserProfile");

const {v4} = require("uuid");

class User {
    // to ensure all related tables are created before query executions 
    _tablesChecker(db) {
        const tables = [UserAccount, UserProfile];
        return tables.reduce((database, table) => {
            return database.run(table._createTableCommand(db));
        }, db);
    }

    // create a new user account, username and password are required
    register({username, password}, callback) {
        if (!username || !password) {
            return callback(DBError.MISSING_CRITICAL_INFO);
        }

        const db = DB.connect();
        const userObj = {
            username: `"${username}"`,
            password: `"${password}"`
        };

        let terminated = false;
        db.serialize(() => {
            this._tablesChecker(db);
            
            db.run(UserAccount._insertTableCommand(userObj), err => {
                if (err) {
                    terminated = true;
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                }
            });

            db.run(`
                INSERT INTO ${UserProfile.schema.tableName} (userid)
                SELECT id FROM ${UserAccount.schema.tableName}
                WHERE username=?
            `, [username], err => {
                if (err) {
                    terminated = true;
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                }

                if (!terminated) {
                    callback(null, "Success");
                }
            });
        })

        db.close();
    }

    // gather user's information
    fetch({username, login_secrete}, callback) {
        const db = DB.connect();

        db.serialize(() => {
            this._tablesChecker(db);

            db.get(`
                SELECT login_secrete, profile.userid, username, createdDate, profile.*
                FROM ${UserAccount.schema.tableName} account
                JOIN ${UserProfile.schema.tableName} profile
                WHERE account.username=?
            `, [username], (err, row) => {
                if (err) {
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                } else {
                    let user = row || {};

                    if (!!login_secrete && login_secrete === user.login_secrete) {
                        delete user.login_secrete;
                    } else {
                        delete user.login_secrete;
                        delete user.createdDate;
                        delete user.middleName;
                        delete user.dob;
                        delete user.telephone;
                        delete user.job;
                    }

                    callback(err, user);
                }
            })
        });

        db.close();
    }

    // reset password and remove account lock
    resetPassword({username, password}, callback) {
        const db = DB.connect();

        db.serialize(() => {
            this._tablesChecker(db);

            db.run(`
                UPDATE ${UserAccount.schema.tableName}
                SET faltyAccess=0, password=?, login_secrete=NULL
                WHERE username=?
            `, [password, username], err => {
                if (err) {
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                } else {
                    callback(null, "Success!");
                }
            });
        });

        db.close();
    }

    // update user's profile, login_secrete is essential for update fields
    update({username, login_secrete, changes = {}}, callback) {
        if (!username || !login_secrete) {
            return callback(DBError.MISSING_CRITICAL_INFO);
        }

        const db = DB.connect();
        const profileFields = UserProfile.schema.columns.map(col => col.name).filter(col => col !== "userid");
        const changeFields = Object.keys(changes).filter(field => profileFields.indexOf(field) >= 0);

        db.serialize(() => {
            this._tablesChecker(db);
        })

        db.run(`
            UPDATE ${UserProfile.schema.tableName}
            SET ${changeFields.map(field => `${field}="${changes[field]}"`).join(", ")}
            WHERE userid IN (
                SELECT id 
                FROM ${UserAccount.schema.tableName}
                WHERE username=? AND login_secrete=?
            )
        `, [username, login_secrete], err => {
            if (err) {
                callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
            } else {
                callback(null, "Success!");
            }
        })

        db.close();
    }

    // login to user's account, if success return a login_secrete 
    // which is essential for update user's account
    // user account will be locked if username and password combination are wrong
    // for more than three times
    login({username, password}, callback) {
        if (!username || !password) {
            return callback(DBError.MISSING_CRITICAL_INFO);
        }

        const login_secrete = v4();
        const db = DB.connect();

        db.serialize(() => {
            this._tablesChecker(db);

            db.run(`
                UPDATE ${UserAccount.schema.tableName}
                SET faltyAccess=(
                    CASE 
                        WHEN password=? THEN 0
                        WHEN password!=? THEN faltyAccess+1
                    END),
                    login_secrete=(
                    CASE 
                        WHEN password=? THEN "${login_secrete}"
                        WHEN password!=? THEN NULL
                    END)
                WHERE username=? AND faltyAccess < 3
            `, [password, password, password, password, username], err => {
                if (err) {
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                }
            });

            db.get(`
                SELECT faltyAccess
                FROM ${UserAccount.schema.tableName} account
                JOIN ${UserProfile.schema.tableName} profile
                WHERE username=?
            `, [username], (err, row) => {
                if (err) {
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                } else if (!row) {
                    callback(DBError.FAILED_AUTH);
                } else if (row.faltyAccess >= 3) {
                    callback(DBError.LOCKED_ACCOUNT);
                } else if (row.faltyAccess === 0) {
                    delete row.faltyAccess;
                    callback(null, {status: "Success!", username, login_secrete});
                } else {
                    callback(DBError.FAILED_AUTH);
                }
            });
        });

        db.close();
    }

    // logout user's account, login_secrete is essential for logout
    logout({username, login_secrete}, callback) {
        if (!username || !login_secrete) {
            return callback(DBError.MISSING_CRITICAL_INFO);
        }

        const db = DB.connect();

        db.serialize(() => {
            this._tablesChecker(db);

            db.run(`
                UPDATE ${UserAccount.schema.tableName}
                SET login_secrete=NULL
                WHERE username=? AND login_secrete=?
            `, [username, login_secrete], err => {
                if (err) {
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                }
            });

            db.get(`
                SELECT login_secrete
                FROM user_account
                WHERE username=?
            `, [username], (err, row) => {
                if (err) {
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                } else if ((row || {}).login_secrete) {
                    callback(DBError.UNAUTHORIZED);
                } else {
                    callback(null, {status: "Success!"});
                }
            });
        });

        db.close();
    }

    // check if a username is unique
    validateUserName({username}, callback) {
        const db = DB.connect();

        db.serialize(() => {
            this._tablesChecker(db);

            db.get(`
                SELECT username 
                FROM ${UserAccount.schema.tableName} 
                WHERE username=?
            `, [username], (err, row) => {
                if (err) {
                    callback(new DBError.DBError(500, `${err.code} (${err.errno})`));
                } else {
                    callback(null, {
                        valid: !row,
                        detail: {
                            existed: !!row
                        }
                    })
                }
            })
        })

        db.close();
    }
}

module.exports = new User();