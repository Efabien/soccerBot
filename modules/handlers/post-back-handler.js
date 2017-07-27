const footFunctionality = require('./functionality/foot');

module.exports = (fb, sender, data, res) => {
	console.log(data);
	res.sendStatus(200);
}