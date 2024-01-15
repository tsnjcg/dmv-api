const faker = require('faker');
const moment = require('moment');

let apiDoc = {
	swagger: "2.0",
	basePath: "/",
	info: {
		title: "Department of Motor Vehicles API",
		version: "1.0.0",
	},
	security: [
		{
			keyScheme: []
		}
	],
	securityDefinitions: {
		keyScheme: {
			type: "basic"
		}
	},
	definitions: {
		Error: {
			type: "object",
			properties: {
				code: {
					type: "string"
				},
				message: {
					type: "string"
				}
			},
			required: ["code", "message"]
		},
		Driver: {
			type: "object",
			properties: {
				lastName: {
					type: "string",
					example: faker.name.lastName()
				},
				firstName: {
					type: "string",
					example: faker.name.firstName()
				},
				dateOfBirth: {
					type: "string",
					example: moment(faker.date.between('1950-01-01T00:00:00.000Z', '2000-01-01T00:00:00.000Z'))
						.format('YYYY-MM-DD')
				},
				address: {
					type: "string",
					example: faker.address.streetAddress()
				},
				city: {
					type: "string",
					example: faker.address.city()
				},
				state: {
					type: "string",
					example: faker.address.stateAbbr()
				},
				zipCode: {
					type: "string",
					example: faker.address.zipCode('#####')
				},
				visionRestriction: {
					type: "boolean",
					example: false
				},
			},
			required: ['lastName', 'firstName', 'dateOfBirth', 'address',
				'city', 'state', 'zipCode', 'visionRestriction']
		},
		Vehicle: {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
				make: {
					type: "object",
					properties: {
						id: {
							type: "string",
						},
						name: {
							type: "string",
						}
					}
				}
			}
		},
		Registration: {
			type: "object",
			properties: {
				id: {
					type: "string",
					example: faker.datatype.uuid().toUpperCase()
				},
				driver: {
					type: "object",
					properties: {
						id: {
							type: "string",
							example: faker.datatype.uuid().toUpperCase()
						},
						lastName: {
							type: "string",
							example: faker.name.lastName()
						},
						firstName: {
							type: "string",
							example: faker.name.firstName()
						},
					}
				},
				modelYear: {
					type: "integer",
					example: faker.datatype.number({ min: 1990, max: 2022, precision: 4.0 })
				},
				licensePlate: {
					type: "string",
					example: faker.random.alphaNumeric(6).toUpperCase()
				},
				registrationDate: {
					type: "string",
					example: moment(faker.date.past(1)).format('YYYY-MM-DD')
				},
				expirationDate: {
					type: "string",
					example: moment(faker.date.future(3)).format('YYYY-MM-DD')
				}
			}
		}
	},
	paths: {},
};

["Driver", "Vehicle"].forEach(type => {
	apiDoc.definitions[`${type}Modify`] = {
		type: "object",
		properties: {
			id: {
				type: "string",
				example: faker.datatype.uuid().toUpperCase()
			},
			...apiDoc.definitions[type].properties
		}
	};
});

module.exports = apiDoc;