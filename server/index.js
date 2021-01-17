const app = require("./app");
const entries = require("./router/entries");

entries.register(app);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}!`);
});