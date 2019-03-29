const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const router = require('./router');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    next();
});

app.use(express.static('client'));

router.set(app);

app.listen(config.port, () => console.log('App listening on port '+ config.port));
