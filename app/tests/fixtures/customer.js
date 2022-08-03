const { faker } = require('@faker-js/faker');

exports.customer = new Object({
	name: faker.name.findName(),
	phone: '03001234567',
    address: faker.address.streetAddress(),
    date_of_birth: "21-10-2000",
	createdAt: faker.date.between('01-10-2021', '01-20-2021'),
	updatedAt: faker.date.between('01-20-2021', '01-25-2021'),
});