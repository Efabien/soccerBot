
module.exports = (fb, sender, data, res) => {
	fb.sendText(sender, data)
	.then((response) => {
		console.log(response);
		res.sendStatus(200);
	})
	.catch((error) => {
		console.log(error);
	});
}
