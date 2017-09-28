module.exports = (text, params) => {
	for (key in params) {
		const pattern = new RegExp(`{{${key}}}`, 'g');
		text = text.replace(pattern, params[key]);
	}
	return text;
}