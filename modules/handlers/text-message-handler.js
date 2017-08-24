const footFunctionality = require('./functionality/foot');
const template = require('../../template');

module.exports = (fb, sender, data, res) => {
	if (data.match(/^foot$/i)) footFunctionality.trigger(fb, sender);
	if (data.match(/^aide$|help/i)) fb.sendText(sender, template.helpMessage);
	if (data.match(/^score/i)) footFunctionality.latestMatch(fb, sender);
	res.sendStatus(200);
}
