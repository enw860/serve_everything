const chalk = require("chalk");

module.exports = {
    info: msg => {
        console.info(chalk.blueBright(`INFO: ${msg}`));
    },

    log: msg => {
        console.log(chalk.greenBright(`LOG: ${msg}`));
    },

    warn: msg => {
        console.error(chalk.yellowBright(`WARNING: ${msg}`));
    },
    
    error: msg => {
        console.error(chalk.redBright(`ERROR: ${msg}`));
    }
}