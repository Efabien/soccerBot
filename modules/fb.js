const request=require('request-promise');
const tool=require('./tool');

module.exports = class Fb {
  constructor(token, url) {
    this._token = token;
    this._url = url;
  }

  send(sender, data) {
    return request( {
      url: this._url,
      qs:{access_token: this._token},
      method: 'POST',
      json: {
        recipient: { id: sender},
        message: data
      }
    }).then((response, body) => {
      if (response.error) {
        throw new Error(response.error)
      } else {
        return response;
      }
    });  
  }

  sendText(sender, text) {
    return this.send(sender, { text: text});
  }
}