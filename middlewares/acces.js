const config = require('../config');
module.exports = function(req, res, next) {
	if (req.headers.authorization && req.headers.authorization === config.accessAPI) return next();
	console.log('unauthorized connection');
	res.json({'message':'you are not authorized to use this service'});
}