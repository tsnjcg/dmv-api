const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dmv', 'dmvuser', 'dmvuser', {
		host: 'localhost',
		dialect: 'mssql'
	}
);

const getAll = async obj => {
	return new Promise(async (resolve, reject) => {
		try {
			const [results, metadata] = await sequelize.query(`SELECT * FROM ${obj.name}`);
			return resolve(results);
		} catch (err) {
			return reject(err);
		}
	});
}

const getAllBy = async (obj, params) => {
	return new Promise(async (resolve, reject) => {
		try {
			const queryParams = Object.keys(params).map(key => `${key} = '${params[key]}'`);
			const query = `SELECT * FROM ${obj.name} WHERE ${queryParams.join(' AND ')}`;
			const [results, metadata] = await sequelize.query(query);
			return resolve(results);
		} catch (err) {
			return reject(err);
		}
	});
}

const post = async obj => {
	return new Promise(async (resolve, reject) => {
		try {
			const values = Object.keys(obj.data).map(key => `'${obj.data[key]}'`);
			const query = `INSERT INTO ${obj.name} (${Object.keys(obj.data).join(', ')}) VALUES (${values.join(', ')})`;
			const [results, metadata] = await sequelize.query(query);
			return resolve(results);
		} catch (err) {
			console.error('Error', err);
			return reject(err);
		}
	});
}

module.exports = { getAll, getAllBy, post };
