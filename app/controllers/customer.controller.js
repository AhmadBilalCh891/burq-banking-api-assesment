const db = require('../models');
const Customer = db.customer;
const Op = db.Sequelize.Op;

// Create and Save a new Customer
exports.create = (req, res) => {
	// Validate request
	if (
		!req.body.name ||
		!req.body.phone ||
		!req.body.address ||
		!req.body.date_of_birth
	) {
		res.status(406).send({
			message: 'Content can not be empty!',
		});
		return;
	}
	// Create a customer
	const customer = {
		name: req.body.name,
		address: req.body.address,
		phone: req.body.phone,
		date_of_birth: req.body.date_of_birth,
	};

	// Save Customer in the database
	Customer.create(customer)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Customer.',
			});
		});
};
