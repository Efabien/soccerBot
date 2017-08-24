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
			return JSON.parse(response);
		}).catch(error => {
			console.log(error);
		});
	}

	getFreshNews(topic) {
		const url = tool.urlBuilder([this._baseUrl, 'api', 'feed', topic, 'fresh']);
		return this.send(url, 'GET');
	}

	getNextNews(topic, refStamp) {
		const url = tool.urlBuilder([this._baseUrl, 'api', 'feed', topic, 'next'], [{ ref: refStamp }]);
		return this.send(url, 'GET');
	}

	getLatestFeed(topic, limit) {
		const url = tool.urlBuilder([this._baseUrl, 'api', 'feed', topic, 'fresh'], [{ limit }]);
		return this.send(url, 'GET');
	}

	getMatchResults(league) {
		const url = tool.urlBuilder([this._baseUrl, 'api', 'soccer', league, 'results']);
		return this.send(url, 'GET');
	}

	getMatchResultsById(league, id, limit) {
		const params = [{ id }];
		if (limit) params.push({ limit });
		const url = tool.urlBuilder([this._baseUrl, 'api', 'soccer', league, 'results'], params);
		console.log(url);
		return this.send(url, 'GET');
	}
}