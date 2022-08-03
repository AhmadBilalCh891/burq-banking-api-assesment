module.exports = app => {
    const Customer = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", Customer.create);
  
    app.use('/api/customers', router);
  };
  