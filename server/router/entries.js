const usersRouter = require("./users");
const landingRouter = require("./landing");

const SERVICES = {
    landing: {routePrefix: "/", router: landingRouter},
    chat: {routePrefix: "/api/users", router: usersRouter}
}

module.exports = {
    register: (app, services) => {
        let serviceEntry;
        (!!services ? services : Object.keys(SERVICES)).forEach(service => {
            serviceEntry = SERVICES[service];
            !!serviceEntry && app.use(serviceEntry.routePrefix, serviceEntry.router);
        });
    }
}