const request = require('request-promise');

module.exports = (req, res) => {

const setting = { 
  get_started: {
    "payload":"start_"
  }
}

request( {
	url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
	timeout: 120000,
	qs: { access_token: process.env.FB_TOKEN_NEW_BORN },
	method: 'POST',
	json: setting
}).then(response => {
	if (response.body.error) {
		throw new Error(response.body.error);
	} else {
		console.log(response);
	}
	res.send(response);
}).catch(error => {
	console.log(error);
});

}