// filter texte messages, postback and quick reply events

const textMessageHandler = require('./handlers/text-message-handler');
const postBackHandler = require('./handlers/post-back-handler');
const quickReply = require('./handlers/quick-reply-handler');
const Fb = require('./fb');
const PayloadHandeler = require('./handlers/payload-handeler');
const config = require('../config');
const watcher = require('./handlers/delivery-handeler');

const fb = new Fb(config.token, config, watcher);
const payloadHandeler = new PayloadHandeler(config.payloadMap, config.payloadSeparator);

module.exports = (req, res) => {
  const input = req.body.entry[0].messaging;
  for(let i = 0; i<input.length; i++){
    const event = input[i];
    const sender = event.sender.id;
    fb.getUser(sender, ['first_name', 'last_name', 'locale', 'timezone', 'gender'])
    .then(user => {
      if (event.message && event.message.text && !event.message.quick_reply) {        
        textMessageHandler(fb, user, event.message.text, res); 
      } else if (event.postback) {
        postBackHandler(fb, user, event.postback, payloadHandeler, res);
      } else if (event.message && event.message.quick_reply) {
        quickReply(fb, user, event.message.quick_reply, payloadHandeler, res);
      } else if (event.delivery) {
        watcher.capture(event.delivery);
      }
    });
  }
}
