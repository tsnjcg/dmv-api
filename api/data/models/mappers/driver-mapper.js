const Driver = require('../Driver');

module.exports = {
	map: body => {
		const driver = new Driver();
		Object.keys(body).forEach(key => {
			driver.setValue(key, body[key]);
		});
		return driver;
	},
	empty: () => new Driver()
};