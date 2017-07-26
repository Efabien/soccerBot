const request = require('request-promise');
const tool = require('../tool');

module.exports = class {
	constructor(config) {
		this._baseUrl = config.restifeoBaseUrl;
		this._authToken = config.restifeoAuthToken;
	}

	send(url, method) {
		return request( {
			url: url,
			method: method,
			headers: {
				authorization: this._authToken
			}
		}).then(response => {
			return response;
		}).catch(error => {
			console.log(error);
		});
	}

	getFreshNews(topic) {
		const url = tool.urlBuilder([this._baseUrl, 'api', 'feed', topic, 'fresh']);
		return this.send(url, 'GET');
	}

	getNextNews(topic, refStamp) {
		const url = tool.urlBuilder([this._baseUrl, 'api','feed', topic, 'next'], [{ ref: refStamp }]);
		return this.send(url, 'GET');
	}
}