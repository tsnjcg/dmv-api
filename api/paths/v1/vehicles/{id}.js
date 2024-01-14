const vehicles = require('../../../data/json/vehicles.json');

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
			const id = req.path.split(/vehicles\//)[1];
			if (!id) return req.status(400).end();
			const vehicle = vehicles.find(vehicle => vehicle.id === id);
			if (vehicle) return res.status(200).json(vehicle);
			res.status(404).send(`Vehicle with ID ${id} not found`);
		}
	],
	delete: [
		(req, res, next) => {
			const id = req.path.split(/vehicles\//)[1];
			const index = vehicles.findIndex(vehicle => vehicle.id === id);
			if (index === -1) return res.status(404).send(`Vehicle with ID ${id} not found`);
			vehicles.splice(index, 1);
			res.status(200).send(`Deleted vehicle with ID ${id}`);
		}
	]
};

module.exports.get.apiDoc = {
	description: 'Retrieve a vehicle by ID',
	tags: ['vehicles'],
	operationId: 'getVehicle',
	summary: "Get vehicle by ID",
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
				type: "array",
				items: {
					$ref: "#/definitions/Vehicle",
				},
			},
		},
		400: {
			description: "Invalid request",
		},
		404: {
			description: "Vehicle not found",
		}
	}
};

module.exports.delete.apiDoc = {
	description: 'Delete an existing vehicle',
	tags: ['vehicles'],
	operationId: 'deleteVehicle',
	summary: "Delete an existing vehicle",
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
				type: "array",
				items: {
					$ref: "#/definitions/Vehicle",
				},
			},
		},
		400: {
			description: "Invalid request",
		},
		404: {
			description: "Vehicle not found",
		}
	}
};