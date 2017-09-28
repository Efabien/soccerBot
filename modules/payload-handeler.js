module.exports = class {
	constructor(map, separator) {
		this.map = map;
		this.separator = separator;
		this.commande = {};
	}

	receive(payloadString) {
		const raw = payloadString.split(this.separator);
		raw.forEach((item, index) => {
			this.commande[this.map[index]] = item;
		});
	}

	getCommande() {
		return this.commande;
	}

	get(param) {
		return this.commande[param];
	}
}
