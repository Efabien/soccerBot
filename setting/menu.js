const config = require('../config');
const request = require('request-promise');
/**
{
  "persistent_menu":[
    {
      "locale":"default",
      "composer_input_disabled":true,
      "call_to_actions":[
        {
          "title":"My Account",
          "type":"nested",
          "call_to_actions":[
            {
              "title":"Pay Bill",
              "type":"postback",
              "payload":"PAYBILL_PAYLOAD"
            },
            {
              "title":"History",
              "type":"postback",
              "payload":"HISTORY_PAYLOAD"
            },
            {
              "title":"Contact Info",
              "type":"postback",
              "payload":"CONTACT_INFO_PAYLOAD"
            }
          ]
        },
        {
          "type":"web_url",
          "title":"Latest News",
          "url":"http://petershats.parseapp.com/hat-news",
          "webview_height_ratio":"full"
        }
      ]
    },
    {
      "locale":"zh_CN",
      "composer_input_disabled":false
    }
  ]
}
**/
module.exports = (req, res) => {
  request( {
		url: config.messengerProfile ,
    timeout: 120000,
		qs: { access_token: config.token },
		method: 'POST',
		json: req.body.setting
	}).then(response => {
		console.log(response);
		res.send(response)
	}).catch(error => {
		console.log(error);
	});

}