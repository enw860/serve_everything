const DB = require("../DB");
const SQL = require("../../../util/SQL");

class UserProfile extends SQL.DBO {
    TABLE_SCHEMA = {
        tableName: "user_profile",
        primaryKeys: [],
        foreignKeys: [{field: "userid", refTable: "user_account",refField: "id"}],
        unique: [],
        columns: [
            {name: "userid", type: "INTEGER", notNull: true},
            {name: "lastName", type: "TEXT"},
            {name: "middleName", type: "TEXT"},
            {name: "firstName", type: "TEXT"},
            {name: "avatar", type: "TEXT"},
            {name: "telephone", type: "TEXT"},
            {name: "dob", type: "TEXT"},
            {name: "email", type: "TEXT"},
            {name: "job", type: "TEXT"}
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

module.exports = new UserProfile();