module.exports = (sequelize, Sequelize) => {
	const Transaction = sequelize.define('transaction', {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		sender_account: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'accounts',
				key: 'account_no',
			},
		},
		reveiver_account: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'accounts',
				key: 'account_no',
			},
		},
		type: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		initiated_by: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'customers',
				key: 'id',
			},
		},
		initiated_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		},
	});

	return Transaction;
};
