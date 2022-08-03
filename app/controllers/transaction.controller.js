const db = require('../models');
const Transaction = db.transaction;
const Op = db.Sequelize.Op;

// Create new transaction
exports.create = (transaction) => {
	Transaction.create(transaction)
		.then(function (createdTransaction) {
			return createdAccount;
		})
		.catch(function (error) {
			throw new Error(error);
		});
};

// Get all Transactions of a customer
exports.getByCustomerId = (req, res) => {
	try {
		Transaction.findAll({
			where: {
				customer_id: req.params.id,
			},
		})
			.then(function (transactions) {
				res.send(transactions);
			})
			.catch(function (error) {
				throw new Error(error);
			});
	} catch (error) {
		res.status(500).send({
			message: 'Error retrieving customer transactions',
		});
	}
};