const db = require('../models');
const { v4 } = require('uuid');
const { request } = require('express');

const Account = db.account;
const Customer = db.customer;
const Transaction = db.transaction;
const Op = db.Sequelize.Op;

// Create a new Account
exports.create = (req, res) => {
	// Validate request
	if (!req.body.customerId || !req.body.amount) {
		res.status(406).send({
			message: 'Content can not be empty!',
		});
		return;
	}

	//Check if customer exists
	Customer.findByPk(req.body.customerId)
		.then((customer) => {
			if (customer) {
				// Create an account
				const account = {
					account_no: v4(),
					total_amount: req.body.amount,
					customer_id: customer.id,
				};

				Account.create(account)
					.then(function (createdAccount) {
						res.send("AccountNo: "+ createdAccount.account_no);
					})
					.catch(function (error) {
						throw new Error(error);
					});
			} else {
				res.status(404).send({
					message: `Cannot find Customer with id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving customer with id=' + id,
			});
		});
};

// Get all Accounts of a customer
exports.getByCustomerId = (req, res) => {
	try {
		Account.findAll({
			where: {
				customer_id: req.params.id,
			},
		})
			.then(function (accounts) {
				res.send(accounts);
			})
			.catch(function (error) {
				throw new Error(error);
			});
	} catch (error) {
		res.status(500).send({
			message: 'Error retrieving customer accounts',
		});
	}
};

// Deposit Money to Account of a customer
exports.deposit = (req, res) => {
	try {
		// Validate request
		if (!req.body.account_no || !req.body.amount) {
			res.status(406).send({
				message: 'Content can not be empty!',
			});
			return;
		}
		Account.findOne({
			where: {
				account_no,
			},
		})
			.then(function (account) {
				account.total_amount = account.total_amount + req.body.amount;
				Account.update(account, {
					where: { id: account.id },
				})
					.then((num) => {
						if (num == 1) {
							let transaction = {
								sender_account: account.account_no,
								receiver_account: account.account_no,
								type: 'Deposited',
								initiated_by: account.customer_id,
							};
							Transaction.create(transaction);
							res.send({
								message: 'Cash is Deposited successfully.',
							});
						}
					})
					.catch((err) => {
						throw new Error(err);
					});
			})
			.catch(function (error) {
				throw new Error(error);
			});
	} catch (error) {
		res.status(500).send({
			message: 'Error retrieving customer accounts',
		});
	}
};

// Credit Money from Account of a customer
exports.credit = (req, res) => {
	try {
		// Validate request
		if (!req.body.account_no || !req.body.amount) {
			res.status(406).send({
				message: 'Content can not be empty!',
			});
			return;
		}
		Account.findOne({
			where: {
				account_no,
			},
		})
			.then(function (account) {
				if (account.total_amount - req.body.amount >= 0) {
					account.total_amount =
						account.total_amount - req.body.amount;
					Account.update(account, {
						where: { id: account.id },
					})
						.then((num) => {
							if (num == 1) {
								let transaction = {
									sender_account: account.account_no,
									receiver_account: account.account_no,
									type: 'Credited',
									initiated_by: account.customer_id,
								};
								Transaction.create(transaction);
								res.send({
									message: 'Cash is Deposited successfully.',
								});
							}
						})
						.catch((err) => {
							throw new Error(err);
						});
				} else {
					res.status(500).send({
						message: "Not Enough Money in customer's account",
					});
				}
			})
			.catch(function (error) {
				throw new Error(error);
			});
	} catch (error) {
		res.status(500).send({
			message: 'Error retrieving customer accounts',
		});
	}
};

// Transfer Money from Account of a customer
exports.transfer = async (req, res) => {
	try {
		// Validate request
		if (
			!req.body.customer_id ||
			!req.body.amount ||
			!req.body.sender_account ||
			!req.body.receiver_account
		) {
			res.status(406).send({
				message: 'Content can not be empty!',
			});
			return;
		}
		let sender_account = await Account.findOne({
			where: {
				id: req.body.sender_account,
				customer_id: req.body.customer_id,
			},
		});

		let receiver_account = await Account.findOne({
			where: {
				id: req.body.receiver_account,
			},
		});

		if (
			sender_account &&
			receiver_account &&
			sender_account.total_amount >= request.body.amount
		) {
			sender_account.total_amount =
				sender_account.total_amount - req.body.amount;
			receiver_account.total_amount =
				receiver_account.total_amount + req.body.amount;

			await Account.update(sender_account, {
				where: { id: sender_account.id },
			});

			await Account.update(receiver_account, {
				where: { id: receiver_account.id },
			});

			let transaction = {
				sender_account: sender_account.account_no,
				receiver_account: receiver_account.account_no,
				type: 'Transfered',
				initiated_by: req.body.customer_id,
			};
			Transaction.create(transaction);
			res.send({
				message: 'Cash is Trasfered successfully.',
			});
		} else {
			throw new Error('Something went wrong');
		}
	} catch (error) {
		res.status(500).send({
			message: 'Error retrieving customer accounts',
		});
	}
};
