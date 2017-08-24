 const config = require('../../../config');
 const Restifeo = require('../../api-call/restifeo');

 const restifeo = new Restifeo(config);
 
 Foot = class {
	constructor (restifeo) {
		this._restifeo = restifeo;
		this._leagueMap = {
			CPL: 'championsLeague'
		}
	}

	trigger(fb, sender) {
		this._restifeo.getFreshNews('foot')
		.then(result => {
			const message = { text: result.description };
			const buttons = fb.quickReplyButtons(
				'Aller aux news suivants',
				 [{ title: 'suivant', payload: 'foot_' + result.created }]);
			fb.sendBatch(sender, [message, buttons]);
		});
	}

	nextNew(fb, sender, refStamp) {
		this._restifeo.getNextNews('foot', refStamp)
		.then(result => {
			const message = { text: result.description };
			const buttons = fb.quickReplyButtons(
				'Aller aux news suivants',
				 [{ title: 'suivant', payload: 'foot_' + result.created }]);
			fb.sendBatch(sender, [message, buttons]);
		});
	}

	latestMatch(fb, sender) {
		this._restifeo.getMatchResults('championsLeague')
		.then(result => {
			const elements = result.slice(0, 4).map((match, index) => {
				return {
					title: match.containders.join(' Vs '),
					subtitle: match.winner ? `Vainqueur : ${match.winner}` : 'Match nul',
					buttons: [
						{
							title: 'Voir le resultat',
							type: 'postback',
							payload: `foot_result_CPL_${index}`
						}
					]
				}
			});

			fb.send(sender, fb.buildListTemplate(elements));
		});
	}

	retrieveLeague(key) {
		return this._leagueMap[key];
	}
	
	matchResult(fb, sender, league, index) {
		this._restifeo.getMatchResults(league)
		.then(result => {
			const match = result[index];
			const containders = match.containders.join(' Vs ');
			const text = `${containders}, le score a été de ${match.score}` +
			(match.winner ? ` ${match.winner} est sorti vainqueur.` : '');
			fb.sendText(sender, text);
		});
	}
}

module.exports = new Foot(restifeo);