const faker = require('faker');
const uuid = require('uuid');
const drivers = require('../../../data/json/drivers.json');
const database = require('../../../data/database');
const mapper = require('../../../data/models/mappers/driver-mapper');
const validator = require('../../../data/models/validators/driver-validator')

let page = 1;

module.exports = {
	get: [
		async (req, res, next) => {
			try {
				const driversData = await database.getAll(mapper.empty());
				res.status(200).json(driversData);
			} catch (err) {
				const errorId = uuid.v4();
				console.error(errorId, err);
				res.status(500).send(`Sorry, but an error has occurred. Reference ID: ${errorId}`)
			}
		}
	],
	post: [
		async (req, res, next) => {
			try {
				const driver = mapper.map(req.body);
				const existing = await database.getAllBy(driver, {
					firstName: driver.getValue('firstName'),
					lastName: driver.getValue('lastName'),
					dateOfBirth: driver.getValue('dateOfBirth')
				});
				if (existing.length > 0) return res.status(409).send(
					`Driver ${driver.getValue('firstName')} ${driver.getValue('lastName')} (${driver.getValue('dateOfBirth')}) already exists`
				);
				await database.post(driver);
				return res.status(201).json(driver.data);
			} catch (err) {
				console.error('Error', err);
				return res.status(500).end();
			}
		}

			//await database.postDriver();
//			if (drivers.find(driver => driver.id === req.body.id)) {
//				return res.status(409).send(`Driver with ID ${req.body.id} already exists`);
//			}
//			if (drivers.find(driver => driver.lastName === req.body.lastName &&
//				driver.firstName === req.body.firstName && driver.dateOfBirth === req.body.dateOfBirth)) {
//				return res.status(409).send(`Driver ${req.body.firstName} ${req.body.lastName} (${req.body.dateOfBirth}) already exists`);
//			}
//			if (!req.body.id) req.body.id = faker.datatype.uuid().toUpperCase();
//			const driver = Object.assign({ id: req.body.id}, req.body);
//			drivers.push(driver);
//		}
	],
	put: [
		(req, res, next) => {
			if (!req.body.id) return res.status(400).send(`ID is required`);
			const index = drivers.findIndex(driver => driver.id === req.body.id);
			if (index < 0) return res.status(404).send(`Driver with ID ${req.body.id} not found`);
			drivers[index] = req.body;
			res.status(200).json(req.body);
		}
	],
	patch: [
		(req, res, next) => {
			if (!req.body.id) return res.status(400).send(`ID is required`);
			const index = drivers.findIndex(driver => driver.id === req.body.id);
			if (index < 0) return res.status(404).send(`Driver with ID ${req.body.id} not found`);
			drivers[index] = Object.assign({}, drivers[index], req.body);
			res.status(200).json(drivers[index]);
		}
	],
	delete: [
		(req, res, next) => {
			if (!req.body.id) return res.status(400).send(`ID is required`);
			const index = drivers.findIndex(driver => driver.id === req.body.id);
			if (index < 0) return res.status(404).send(`Driver with ID ${req.body.id} not found`);
			drivers[index] = Object.assign({}, drivers[index], req.body);
			res.status(200).json(drivers[index]);
		}
	]
};

module.exports.get.apiDoc = {
	description: 'Gets all drivers',
	tags: ['drivers'],
	operationId: 'getDrivers',
	summary: "Get all drivers",
	responses: {
		200: {
			description: "Success",
			schema: {
				type: "array",
				items: {
					$ref: "#/definitions/Driver",
				},
			},
		}
	}
};

module.exports.post.apiDoc = {
	description: 'Adds a new driver',
	tags: ['drivers'],
	operationId: 'postDriver',
	summary: "Add a new driver",
	consumes: ["application/json"],
	produces: ["application/json"],
	parameters: [
		{
			in: "body",
			name: "driver",
			schema: {
				$ref: "#/definitions/Driver"
			},
			required: true
		}
	],
	responses: {
		201: {
			description: "Success",
			schema: {
				$ref: "#/definitions/DriverModify"
			},
		},
		400: {
			description: "Invalid format",
		},
		409: {
			description: "Driver already exists",
		}
	}
};

["Put", "Patch"].forEach(method => {
	module.exports[method.toLowerCase()].apiDoc = JSON.parse(JSON.stringify(module.exports.post.apiDoc));
	const doc = module.exports[method.toLowerCase()].apiDoc;
	doc.responses = Object.assign({}, module.exports.post.apiDoc.responses);
	doc.description = "Modifies an existing driver";
	doc.operationId = `${method.toLowerCase()}Driver`;
	doc.summary = "Modify an existing driver";
	//doc.parameters[0].schema.$ref = `#/definitions/Driver${method}`;
	doc.parameters[0].schema.$ref = `#/definitions/DriverModify`;
	doc.responses["200"] = Object.assign({}, doc.responses["201"]);
	doc.responses["404"] = { description: "Driver not found" };
	delete doc.responses["201"];
	delete doc.responses["409"];
});
