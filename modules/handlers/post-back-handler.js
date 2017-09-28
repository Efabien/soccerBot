const footFunctionality = require('./functionality/foot');
const template = require('../../template');
const compiler = require('../templateCompiler');

module.exports = (fb, user, data, payloadHandeler, res) => {
  payloadHandeler.receive(data.payload);
  const commande = payloadHandeler.getCommande();
  const league = footFunctionality.retrieveLeague(commande.league);
  if(commande.type === 'start') {
    fb.sendText(user.id, compiler(template.welcomeMessage, { userName: user.first_name}));
  }
  if (commande.type === 'foot') {
     if (commande.action === 'getNews') footFunctionality.trigger(fb, user.id);
     if (commande.action === 'help') fb.sendText(user.id, template.helpMessage);
     if (commande.action === 'result') {
      if (commande.subAction === 'latestMatch') footFunctionality.latestMatch(fb, user.id);
      if (commande.subAction === 'detail') footFunctionality.matchResult(fb, user.id, league, commande.id);
      if (commande.subAction === 'next') footFunctionality.latestMatchFromId(fb, user.id, league, commande.id, 4);
     }
  }
  res.sendStatus(200);
}