const apiKeys = require('./api-keys.json');

module.exports = {
	validate: (key, secret) => {
		const match = apiKeys.find(apiKey => apiKey.key === key);
		return (match && secret === match.secret);
	}
};