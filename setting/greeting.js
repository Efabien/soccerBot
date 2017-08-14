const request = require('request-promise');

module.exports = (req, res) => {

/** {
  "greeting":[
    {
      "locale":"default",
      "text":"Hello!"
    }, {
      "locale":"en_US",
      "text":"Timeless apparel for the masses."
    }
  ] 
}
**/
request( {
	url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
  timeout: 120000,
	qs: { access_token: process.env.FB_TOKEN_NEW_BORN },
	method: 'POST',
	json: req.body.setting
}).then(response => {
	console.log(response);
	res.send(response);
}).catch(error => {
	console.log(error);
});

}