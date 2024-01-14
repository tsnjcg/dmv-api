const drivers = require('../../../data/json/drivers.json');
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
			const id = req.path.split(/drivers\//)[1];
			if (!id) return res.status(400).send('ID is required');
			const driver = drivers.find(driver => driver.id === id);
			if (!driver) return res.status(404).send(`Driver with ID ${id} not found`);
			res.status(200).json(driver);
		}
	],
	delete: [
		(req, res, next) => {
			const deleteRegistrations = req.query.deleteRegistrations;
			const id = req.path.split(/drivers\//)[1];
			if (!id) return res.status(400).send('ID is required');
			let driver = drivers.find(driver => driver.id === id);
			if (!driver) return res.status(404).send(`Driver with ID ${id} not found`);
			const existingRegistrations = registrations.filter(reg => reg.driver.id === id);
			if (existingRegistrations.length > 0) {
				if (!deleteRegistrations) {
					return res.status(409).send(
						`Driver with ID ${id} cannot be deleted because of existing ` +
						`registration records ${existingRegistrations.map(e => e.id).join(', ')}`);
				} else {
					existingRegistrations.forEach(er => {
						const regIndex = registrations.indexOf(er);
						registrations.splice(regIndex, 1);
					});
					const driverIndex = drivers.indexOf(driver);
					drivers.splice(driverIndex, 1);
					return res.status(200).send(
						`Deleted driver with ID ${id} and existing ` +
						`registration records ${existingRegistrations.map(e => e.id).join(', ')}`);
				}
			} else {
				return res.status(200).end();
			}
			res.status(400).end();
		}
	]
};

module.exports.get.apiDoc = {
	description: 'Retrieve a driver by ID',
	tags: ['drivers'],
	operationId: 'getDriver',
	summary: "Get driver by ID",
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
				$ref: "#/definitions/DriverModify",
			},
		},
		400: {
			description: "Bad request",
		},
		404: {
			description: "Driver not found",
		}
	}
};

module.exports.delete.apiDoc = {
	description: 'Deletes an existing driver. This will not succeed if registration records exist containing the driver ID.',
	tags: ['drivers'],
	operationId: 'deleteDriver',
	summary: "Delete driver",
	parameters: [
		{
			in: 'path',
			name: 'id',
			required: true,
			type: 'string'
		},
		{
			in: 'query',
			name: 'deleteRegistrations',
			required: false,
			type: 'boolean'
		}
	],
	responses: {
		200: {
			description: "Success",
			schema: {
				$ref: "#/definitions/DriverModify",
			},
		},
		400: {
			description: "Bad request",
		},
		404: {
			description: "Driver not found",
		},
		409: {
			description: "Driver cannot be deleted",
		}
	}
};