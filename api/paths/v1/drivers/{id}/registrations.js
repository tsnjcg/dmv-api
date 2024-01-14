const drivers = require('../../../../data/json/drivers.json');
const registrations = require('../../../../data/json/registrations.json');

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
			const driverId = req.path.match(/drivers\/(.*?)\//)[1];
			if (!driverId) return res.status(400).send('ID is required');
			const driverRegistrations = registrations.filter(registration => registration.driver.id === driverId);
			if (!driverRegistrations || driverRegistrations.length === 0) {
				return res.status(404).end(`Driver with ID ${driverId} not found`);
			}
			res.status(200).json(driverRegistrations);
		}
	]
};

module.exports.get.apiDoc = {
	description: 'Gets all registrations for a driver',
	tags: ['drivers'],
	operationId: 'getDriverRegistrations',
	summary: "Get all registrations for a driver",
	responses: {
		200: {
			description: "Success",
			schema: {
				type: "array",
				items: {
					$ref: "#/definitions/Registration",
				},
			},
		},
		404: {
			description: "Driver not found",
		}
	}
};