const registrations = require('../../../data/json/registrations.json');

module.exports = {
	parameters: [
		{
			in: 'path',
			name: 'id',
			required: true,
			type: 'string'
		}
	],
	get: [
		(req, res, next) => {
			const id = req.path.split(/registrations\//)[1];
			const reg = registrations.find(registration => registration.id === id);
			if (!reg) return res.status(404).send(`Registration with ID ${id} not found`);
			res.status(200).json(reg);
		}
	],
	delete: [
		(req, res, next) => {
			const id = req.path.split(/registrations\//)[1];
			const index = registrations.findIndex(registration => registration.id === id);
			if (index === -1) return res.status(404).send(`Registration with ID ${id} not found`);
			registrations.splice(index, 1);
			res.status(200).send(`Deleted registration with ID ${id}`);
		}
	]
};

module.exports.get.apiDoc = {
	description: 'Retrieve a registration by ID',
	tags: ['registrations'],
	operationId: 'getRegistration',
	summary: "Get registration by ID",
	parameters: [
		{
			in: 'path',
			name: 'id',
			required: true,
			type: 'string'
		}
	],
	responses: {
		200: {
			description: "Success",
			schema: {
				$ref: "#/definitions/Registration",
			},
		},
		400: {
			description: "Bad request",
		},
		404: {
			description: "Registration not found",
		}
	}
};

module.exports.delete.apiDoc = {
	description: 'Delete a registration by ID',
	tags: ['registrations'],
	operationId: 'deleteRegistration',
	summary: "Delete registration by ID",
	parameters: [
		{
			in: 'path',
			name: 'id',
			required: true,
			type: 'string'
		}
	],
	responses: {
		200: {
			description: "Success",
			schema: {
				$ref: "#/definitions/Registration",
			},
		},
		400: {
			description: "Bad request",
		},
		404: {
			description: "Registration not found",
		}
	}
};