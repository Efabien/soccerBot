const config = require('../config');

module.exports = function (req, res) {
	if (req.query['hub.verify_token'] === config.token) {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('Error, wrong token');
	}

}
