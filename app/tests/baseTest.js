global.db = require('../models');
const db = require("../models");

exports.setUp = async () => {
	await db.sequelize.authenticate();
};

exports.tearDown = async () => {
	await truncateTables();
	await db.sequelize.close();
};

const truncateTables = async () => {
	let tables = [
		'customers',
		'accounts',
		'transactions'
	];
	for (let table of tables) {
		await db.sequelize.query(`TRUNCATE ${table} CASCADE;`);
	}
};



