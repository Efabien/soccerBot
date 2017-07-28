 const config = require('../../../config');
 const Restifeo = require('../../api-call/restifeo');

 const restifeo = new Restifeo(config);
 
 Foot = class {
	constructor (restifeo) {
		this._restifeo = restifeo;
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
}

module.exports = new Foot(restifeo);