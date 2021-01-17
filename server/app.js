const express = require("express");

const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression');
const cors = require('cors');

// tools from OS
const path = require('path');

// logger
const logger = require('morgan');

// network security
const Ddos = require('ddos');
const { nextTick } = require('process');
const ddos = new Ddos({ burst: 10, limit: 15 }); // every call last for 10 second, denied connection if there are 15 connection at same time

// init app
const app = express();
const sess = { secret: 'keyboard cat', cookie: { maxAge: 20 * 60 * 1000, secure: false }, resave: false, saveUninitialized: true };

// install middlewares
app.use('/', express.static(path.join(__dirname, '../dist')));

app.use(ddos.express);
app.use(bodyParser.json());
app.use(session(sess));
app.use(compression());
app.use(cors());

app.use(logger('short'));

module.exports = app;