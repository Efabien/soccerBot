const config = require('../config');
const tool = require('./tool');
const Restifeo = require('./api-call/restifeo');
const restifeo = new Restifeo(config);
const ref = '1501101603000';

const foot = require('./handlers/functionality/foot');

const match = {
	houre: '23:45',
	date: '31/01/2015',
	timeZone: 'CET'
}

const title = foot.getMatchTitle(match, 3);
console.log(title);

