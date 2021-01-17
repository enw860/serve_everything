const DB = require("../DB");
const SQL = require("../../../util/SQL");

class UserAccount extends SQL.DBO {
    TABLE_SCHEMA = {
        tableName: "user_account",
        primaryKeys: ["id"],
        foreignKeys: [],
        unique: ["username"],
        columns: [
            {name: "id", type: "INTEGER"},
            {name: "username", type: "TEXT", notNull: true},
            {name: "password", type: "TEXT", notNull: true},
            {name: "faltyAccess", type: "INT", default: {value: 0}},
            {name: "createdDate", type: "TEXT", default: {value: `"${(new Date()).toUTCString()}"`}},
            {name: "login_secrete", type: "TEXT"}
        ]
    }

    constructor() {
        super();

        super.setSchema(this.TABLE_SCHEMA);

        this._createTable(null, err => err && console.error(err));

    }

    _createTable(db, callback) {
        if (db) {
            return db.run(super._createTableCommand(), callback)
        } else {
            const db = DB.connect();
    
            db.serialize(() => {
                db.run(super._createTableCommand(), callback)
            });
    
            db.close();
        }
    }
}

module.exports = new UserAccount();