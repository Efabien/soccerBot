const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const getStarted = require('./setting/get-started');
const menu = require('./setting/menu');
const greeting = require('./setting/greeting');

const fbVerification = require('./middlewares/fb-verification');
const apiAcces = require('./middlewares/acces');
const controler = require('./modules/controler');

app.set('port', (process.env.PORT || 5000));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', fbVerification);

// to post data
app.post('/webhook/', controler);

app.post('/setting/getStarted', apiAcces, getStarted);

app.post('/setting/menu', apiAcces, menu);

app.post('/setting/greeting', apiAcces, greeting);

// spin server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
