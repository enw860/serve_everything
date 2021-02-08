const crypto = require("crypto");

function encrypt(str = "") {
    var hash = crypto.createHash("sha256");
    data = hash.update(str, "utf-8");
    gen_hash = data.digest("hex");
    return gen_hash;
}

function validatePassword(str = "") {
    const validate_result = {
        tooShort: str.length < 6,
        noCap: !str.match(/[A-Z]/),
        noLow: !str.match(/[a-z]/),
        noNum: !str.match(/[0-9]/),
        noSpc: !str.match(/[.!:|,$%@#^&*_]/)
    }

    return {
        valid: !Object.values(validate_result).reduce((cum, result) => cum || !!result, false),
        detail: validate_result
    }

}

function isDevMode() {
    return (process.env.NODE_ENV || "").toLocaleLowerCase() !== "production";
}

module.exports = {
    encrypt,
    validatePassword,
    isDevMode
}