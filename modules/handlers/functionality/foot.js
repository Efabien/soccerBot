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
				 [{ title: 'suivant', payload: 'foot_' + result.id }]);
			fb.sendBatch(sender, [message, buttons]);
		});
	}

	nextNew(fb, sender, id) {
		this._restifeo.getNextNews('foot', id)
		.then(result => {
			const message1 = { text: result.title };
			const message2 = { text: result.description };
			const buttons = fb.quickReplyButtons(
				'Aller aux news suivants',
				 [{ title: 'suivant', payload: 'foot_' + result.id }]);
			fb.sendBatch(sender, [message1, message2, buttons]);
		});
	}

	latestMatch(fb, sender) {
		this._restifeo.getMatchResults('championsLeague')
		.then(result => {
			if (!result.length) {
				fb.sendText(sender, 'Oops, il semblerais qu\'il n\'y ait encore aucun matchs');
			} else {
				const body = this.buildMatchDetails(result.slice(0, 4));
				fb.send(sender, fb.buildListTemplate(body.elements, body.buttons));
			}	
		});
	}

	latestMatchFromId(fb, sender, league, id, limit) {
		this._restifeo.getMatchResultsById(league, id, limit)
		.then(result => {
			if (!result.length) {
				fb.sendText(sender, 'Oops, il semblerais qu\'il n\'y ait plus d\'autres matchs');
			} else {
				const body = this.buildMatchDetails(result);
				fb.send(sender, fb.buildListTemplate(body.elements, body.buttons));
			}
		});
	}

	retrieveLeague(key) {
		return this._leagueMap[key];
	}
	
	matchResult(fb, sender, league, id) {
		this._restifeo.getMatchResultsById(league, id)
		.then(result => {
			const match = result[0];
			const containders = match.containders.join(' Vs ');
			const text = `${containders}, le score a été de ${match.score}.` +
			(match.winner ? ` ${match.winner} est sorti vainqueur.` : '');
			fb.sendText(sender, text);
		});
	}

	buildMatchDetails(data) {
		const result = {};
		const lastMatchId = data[data.length - 1].id;
		result.elements = data.map(match => {
			return {
				title: match.containders.join(' Vs '),
				subtitle: match.winner ? `Vainqueur : ${match.winner}` : 'Match nul',
				buttons: [
					{
						title: 'Voir le resultat',
						type: 'postback',
						payload: `foot_result_CPL_detail_${match.id}`
					}
				]
			}
		});

		if (data.length === 4) {
			result.buttons = [
				{
					title: "Matchs suivants",
					type: 'postback',
					payload: `foot_result_CPL_next_${lastMatchId}`
				}
			];
		}	

		return result;
	}
	
}

module.exports = new Foot(restifeo);