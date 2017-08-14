const request=require('request-promise');
const tool=require('./tool');

module.exports = class Fb {
  constructor(token, url, watcher) {
    this._token = token;
    this._url = url;
    this._watcher = watcher;
  }

  send(sender, data) {
    if (data.text && data.text.length > 640) {
      const authorizedLength = data.text.substr(0, 640);
      data.text = authorizedLength.replace(/ .+$/, '');
    }
    return request( {
      url: this._url,
      timeout: 120000,
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
        return response.message_id;
      }
    });  
  }

  sendText(sender, text) {
      return this.send(sender, { text: text});
  }

  sendBatch(sender, datas) {
    const self = this;
    if (datas.length <= 0) {
      return;
     } 
    this.send(sender, datas[0])
    .then((response) => {
      self._watcher.on('delivered', (delivery) => {
        if (delivery.mids.indexOf(response) > -1) {
          datas.shift();
          self.sendBatch(sender, datas);
        }
      });
    });
  }

  quickReplyButtons(text, params) {
    const result = {
      text: text,
      quick_replies: []
    };
    params.forEach(param => {
      const hold = {
          content_type: 'text',
          title: param.title,
          payload: param.payload
        };
      if (param.image_url) hold.image_url = param.image_url;
      result.quick_replies.push(hold);
    });
    return result;
  }
}
