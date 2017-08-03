const request = require('request-promise');

module.exports = (req, res) => {

const setting = { 
  get_started: {
    "payload":"start_"
  }
}

request( {
	url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
	qs: { access_token: process.env.FB_TOKEN_NEW_BORN },
	method: 'POST',
	json: setting
}).then(response => {
	console.log(response);
	res.send(response);
}).catch(error => {
	console.log(error);
});

}