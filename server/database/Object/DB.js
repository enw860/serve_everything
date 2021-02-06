const path = require("path");
const logger = require("../../util/Logger");
const sqlite3 = require("sqlite3").verbose();

module.exports = {
    connect: () => new sqlite3.Database(path.join(__dirname, "../DB/db"), err => !!err && logger.error(err))
};