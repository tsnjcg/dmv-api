const _ = require('lodash');
const apiDoc = require('../../../api-doc');

const validate = body => {
	const driver = apiDoc.definitions.Driver.properties;
	if (_.difference(Object.keys(driver), Object.keys(body)).length > 0) {
		console.log("#########");
		return false;
	}
	Object.keys(driver).forEach(key => {
		//console.log(driver[key].type);// === typeof body[key]);
	});
};

module.exports = { validate };
