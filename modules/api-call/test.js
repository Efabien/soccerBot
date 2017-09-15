const config = require('../../config');
const Restifeo = require('./restifeo');

const api = new Restifeo(config);

api.getNextNews('foot', 'a3d61bf36a82b19fd84e7497f5bbf63016e6b5c6')
.then(response => {
	console.log(response.description);
});