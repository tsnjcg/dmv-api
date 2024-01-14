const faker = require('faker');
const vehicles = require('../../../data/json/vehicles.json');

module.exports = {
	get: [
		(req, res, next) => {
			if (req.query && req.query.id) {
				const vehicle = vehicles.find(vehicle => vehicle.id === req.query.id);
				if (vehicle) return res.status(200).json(vehicle);
				return res.status(404).send(`Vehicle with ID ${req.query.id} not found`);
			}
			// Return all vehicles
			res.status(200).json(vehicles);
		}
	],
	post: [
		(req, res, next) => {
			if (!req.body || !req.body.name || !req.body.makeId) {
				return res.status(400).end();
			}
			const makeId = /[abcdef\d\-]+/i.exec(req.body.makeId)[0];
			const id = req.body.id || faker.datatype.uuid().toUpperCase();
			const name = req.body.name.trim();

			if (vehicles.find(vehicle => vehicle.id === id)) {
				return res.status(409).send(`Vehicle with ID ${id} already exists`);
			} else if (vehicles.find(vehicle => vehicle.name.toUpperCase() === name.toUpperCase())) {
				return res.status(409).send(`Vehicle with name "${name}" already exists`);
			}

			const vehicle = { id, name,
				make: {
					id: makeId,
					name: vehicles.find(vehicle => vehicle.make.id === makeId).make.name
				}
			};

			vehicles.push(vehicle);
			res.status(201).json(vehicle);
		}
	],
	put: [],
	patch: []
};

module.exports.get.apiDoc = {
	description: 'Retrieves all vehicles',
	tags: ['vehicles'],
	operationId: 'getVehicles',
	summary: "Get all vehicles",
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
		404: {
			description: "Not Found",
		}
	}
};

module.exports.post.apiDoc = {
	description: 'Adds a new vehicle',
	tags: ['vehicles'],
	operationId: 'postVehicle',
	summary: "Add a new vehicle",
	consumes: ["application/x-www-form-urlencoded"],
	parameters: [
		{
			in: 'formData',
			name: 'name',
			required: true,
			type: 'string'
		},
		{
			in: 'formData',
			name: 'makeId',
			required: true,
			type: 'string',
			enum: [
				'F6C85A6C-483C-461E-8806-20852101CE99: Acura',
				'09F7C366-6AA0-4708-8438-6D7FB5533454: Aston Martin',
				'7CA7E30C-A316-4F67-BBCD-4B4B5C9BA6CB: Audi',
				'9E5494D6-B5AB-4D72-AB7E-F569B2C7E73D: Bentley',
				'30F5C1B0-2124-47CD-B0D4-23B37CB916DF: BMW',
				'F2A5E451-EA4B-4F9E-8298-1A5B3ACE7E73: Buick',
				'B3734F07-AA0A-4437-8647-2B52E5A65DC0: Cadillac',
				'F1C5A7F7-70D8-40CC-8914-8F6E557FA68F: Chevrolet',
				'8CB8FABD-C3E1-4522-AAC8-8DA70880BC4B: Chrysler',
				'4221B3E4-FDAC-431D-8D16-2A36F653C89C: Dodge',
				'C4AFD853-5A9A-4350-9239-FCFDED62C223: Eagle',
				'29154F34-CCBC-4225-B8C7-9B3D09534232: Ford',
				'7A30534C-F704-40D9-8BB5-7420EA7A0580: GMC',
				'03EF3306-35C3-427B-9FA6-B30DCED6022C: Honda',
				'85F34B3C-53F6-47AB-B41A-A1CC8D989C09: Hummer',
				'BADA1A57-E274-419C-B169-6CE7560CF7ED: Hyundai',
				'AEFE9F18-8F35-4977-96C5-D385737F3C7C: Infiniti',
				'C841B073-84E9-4C62-B38E-9BEF2F879FE7: Isuzu',
				'6D56D09C-D22D-4E99-B68A-4CB262310645: Jeep',
				'B790F06E-E84C-4699-908C-B5CA7ECC900F: Kia',
				'F33E01F8-E3EF-4423-971D-12E495D99D43: Lamborghini',
				'D6D81D5B-DCB1-4494-8766-046BCDF4BAD3: Land Rover',
				'1D4C22E1-2595-4B1B-AEA2-599455825E9E: Lexus',
				'2A518BD5-FB58-4AC2-9FF5-963754AAB8B2: Lincoln',
				'414D81F7-0615-46B8-840C-83297F07DEFD: Lotus',
				'C980ABC5-8D76-4460-9920-717637B46532: Maserati',
				'AF0CF874-A9A7-4B29-99AD-C3CC72436124: Mazda',
				'8F97C90B-1E38-4E72-A348-D7A850ACF54F: Mercedes-Benz',
				'B4EB43A5-4F53-4BBA-94D5-7B4FCAD07A03: Mercury',
				'F745E6AB-C6A6-49B3-B194-659780D29534: MINI',
				'6EE62415-79FB-478B-8CF6-D361FC46FAC1: Mitsubishi',
				'2B48E7B4-2FAB-40A3-BE57-9A4D2660A4FE: Nissan',
				'728A728B-2A31-4235-AB4C-36314AAD1492: Oldsmobile',
				'FCB88330-6C96-4B64-BA43-12DAF11C8CD5: Pontiac',
				'C6360F72-47B6-4AFE-98F7-683959B3C8B2: Porsche',
				'0EDBCFA9-7C78-4EF7-8A5F-E89E01C1676B: Saab',
				'3D87F2D6-4389-435F-9844-EAC0BA2398C9: Saturn',
				'4F883FA7-91C9-463A-9724-6DBCB44E57AD: Subaru',
				'CA3A7B41-C6F6-4A0B-A9CF-E82F58CD3A89: Suzuki',
				'DC953EF8-5BD3-4B3A-A5BC-AA6101674663: Toyota',
				'72B9F948-D3F2-49C7-AE71-2DCB06B72246: Volkswagen',
				'E3893592-778C-4B9B-A26E-DEDE747A865A: Volvo'
			]
		}
	],
	responses: {
		201: {
			description: "Success",
			schema: {
				type: "object",
				items: {
					$ref: "#/definitions/Vehicle",
				},
			}
		},
		400: {
			description: "Invalid format",
		},
		409: {
			description: "Vehicle already exists",
		}
	}
};

["Put", "Patch"].forEach(method => {
	module.exports[method.toLowerCase()].apiDoc = Object.assign({}, module.exports.post.apiDoc);
	const doc = module.exports[method.toLowerCase()].apiDoc;
	doc.responses = Object.assign({}, module.exports.post.apiDoc.responses);
	doc.description = "Modifies an existing vehicle";
	doc.operationId = `${method.toLowerCase()}Vehicle`;
	doc.summary = "Modify an existing vehicle";
	doc.parameters = JSON.parse(JSON.stringify(module.exports.post.apiDoc.parameters));
	doc.parameters.forEach(param => param.required = false);
	doc.responses = JSON.parse(JSON.stringify(module.exports.post.apiDoc.responses));
	doc.responses["200"] = JSON.parse(JSON.stringify(module.exports.post.apiDoc.responses["201"]));
	doc.responses["200"].schema.items.$ref = "#/definitions/VehicleModify",
	doc.responses["404"] = { description: "Vehicle not found" }
	delete doc.responses["201"];
	delete doc.responses["409"];
});
