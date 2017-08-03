const footFunctionality = require('./functionality/foot');

module.exports = (fb, sender, data, res) => {
	if (data === 'foot') footFunctionality.trigger(fb, sender);
	res.sendStatus(200);
}
