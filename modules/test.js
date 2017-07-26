const config = require('../config');
const tool = require('./tool');
const Restifeo = require('./api-call/restifeo');
const restifeo = new Restifeo(config);
const ref = '1501101603000';

restifeo.getFreshNews('foot')
.then(result => {
	console.log(result);
});

restifeo.getNextNews('foot', ref)
.then(result => {
	console.log(result);
});

