const footFunctionality = require('./functionality/foot');

module.exports = (fb, user, data, res) => {
	const type = data.payload.split('_')[0];
	if (type === 'foot') {
		const id = data.payload.split('_')[1];
		footFunctionality.nextNew(fb, user.id, id);
		res.sendStatus(200);
	}
}
