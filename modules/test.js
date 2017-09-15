const config = require('../config');
const tool = require('./tool');
const Restifeo = require('./api-call/restifeo');
const restifeo = new Restifeo(config);
const ref = '1501101603000';

const collection = [{item: 1}, {item: 2}, {item: 3}, {item: 4}, {item: 1}, {item: 2}, {item: 3}, {item: 4}, {item: 3}, {item: 4}];
console.log(tool.breakBy4(collection, []));

