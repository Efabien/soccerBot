const request=require('request-promise');
const tool=require('./tool');

module.exports = class Fb {
  constructor(token, config, watcher) {
    this._token = token;
    this._messagingUrl = config.messengerAPI;
    this._graphAPI = config.graphAPI;
    this._watcher = watcher;
  }

  send(sender, data) {
    if (data.text && data.text.length > 640) {
      const authorizedLength = data.text.substr(0, 640);
      data.text = authorizedLength.replace(/ .+$/, '');
    }
    return request( {
      url: this._messagingUrl,
      timeout: 120000,
      qs:{access_token: this._token},
      method: 'POST',
      json: {
        recipient: { id: sender},
        message: data
      }
    }).then((response, body) => {
      if (response.error) {
        throw new Error(response.error);
      } else {
        return response.message_id;
      }
    });  
  }

  sendText(sender, text) {
    return this.send(sender, { text: text});
  }

  getUser(id, projection) {
    const url = `${this._graphAPI}/${id}/?fields=${projection.join(',')}&access_token=${this._token}`;
    return request( {
      url: url,
      timeout: 120000,
      method: 'GET'
    }).then(response => {
      if (response.error) throw new Error(response.error);
      return JSON.parse(response);
    });
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

  /**
  "elements": [
          {
            "title": "Classic T-Shirt Collection",
            "subtitle": "See all our colors",
            "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",          
            "buttons": [
              {
                "title": "View",
                "type": "web_url",
                "url": "https://peterssendreceiveapp.ngrok.io/collection",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://peterssendreceiveapp.ngrok.io/"            
              }
            ]
          },
          {
            "title": "Classic White T-Shirt",
            "subtitle": "See all our colors",
            "default_action": {
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            }
          }
        ],
        "buttons": [
          {
            "title": "View More",
            "type": "postback",
            "payload": "payload"            
          }
        ]
  **/
  buildListTemplate(elements, buttons) {
    const data = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'list',
          top_element_style: 'compact',
          elements: elements
        }
      }
    };
    if (buttons) data.attachment.payload.buttons = buttons;
    return data;
  }
}
