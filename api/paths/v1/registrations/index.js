const registrations = require('../../../data/json/registrations.json');

module.exports = {
	get: [
		(req, res, next) => {
			res.status(200).json(registrations);
		}
	],
	post: [
		(req, res, next) => {
			return res.status(405).end();
		}
	]
};

module.exports.get.apiDoc = {
	description: 'Retrieves all registrations',
	tags: ['registrations'],
	operationId: 'getRegistrations',
	summary: "Get all registrations",
	responses: {
		200: {
			description: "Success",
			schema: {
				type: "array",
				items: {
					$ref: "#/definitions/Registration",
				},
			},
		}
	}
};