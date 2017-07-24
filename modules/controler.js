// filter texte messages, postback and quick reply events

const textMessageHandler = require('./handlers/text-message-handler');
const postBackHandler = require('./handlers/post-back-handler');
const quickReply = require('./handlers/quick-reply-handler');
const Fb = require('./fb');
const config = require('../config');
fb = new Fb(config.token, config.messengerAPI);

module.exports = (req, res) => {
  const input = req.body.entry[0].messaging;
  for(let i=0; i<input.length; i++){
    const event=input[i];
    const sender=event.sender.id;
    if (event.message && event.message.text) {        
      textMessageHandler(fb, sender, event.message.text, res); 
    } else if (event.postback) {
      postBackHandler(fb, sender, event.postback, res);
    } else if (event.message && event.message.quick_reply) {
      quickReply(fb, sender, event.message.quick_reply, res);
    }
  }
}
