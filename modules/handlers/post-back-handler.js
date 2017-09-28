const footFunctionality = require('./functionality/foot');
const template = require('../../template');
const compiler = require('../templateCompiler');

module.exports = (fb, user, data, res) => {
  const commande = data.payload.split('_');
  const type = commande[0];
  const action = commande[1];
  const league = footFunctionality.retrieveLeague(commande[2]);
  const subAction = commande[3];
  const id = commande[4];

  if(type === 'start') {
    fb.sendText(user.id, compiler(template.welcomeMessage, { userName: user.first_name}));
  }
  if (type === 'foot') {
     if (action === 'getNews') footFunctionality.trigger(fb, user.id);
     if (action === 'help') fb.sendText(user.id, template.helpMessage);
     if (action === 'result') {
      if (subAction === 'latestMatch') footFunctionality.latestMatch(fb, user.id);
      if (subAction === 'detail') footFunctionality.matchResult(fb, user.id, league, id);
      if (subAction === 'next') footFunctionality.latestMatchFromId(fb, user.id, league, id, 4);
     }
  }
  res.sendStatus(200);
}