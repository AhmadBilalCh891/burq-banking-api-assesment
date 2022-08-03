module.exports = (sequelize, Sequelize) => {
	const Account = sequelize.define('account', {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		account_no: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		total_amount: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		customer_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'customers',
				key: 'id',
			},
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		},
	});

	return Account;
};
