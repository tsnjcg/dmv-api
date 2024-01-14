module.exports = class Driver {
	constructor(driverDto = {}) {
		this.name = 'Driver';
		this.data = driverDto;
	}
	getValue = name => this.data[name];
	setValue = (name, value) => this.data[name] = value;
	deleteValue = name => delete this.data[name];
}