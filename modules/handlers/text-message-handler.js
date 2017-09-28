const footFunctionality = require('./functionality/foot');
const template = require('../../template');

module.exports = (fb, user, data, res) => {
	if (data.match(/^foot$/i)) footFunctionality.trigger(fb, user.id);
	if (data.match(/^aide$|help/i)) fb.sendText(user.id, template.helpMessage);
	if (data.match(/^score$/i)) footFunctionality.latestMatch(fb, user.id);
	if (data.match(/^programme$/i)) footFunctionality.nextMatch(fb, user.id, 'CPL');
	res.sendStatus(200);
}
