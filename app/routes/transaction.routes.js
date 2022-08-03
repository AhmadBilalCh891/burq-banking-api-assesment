module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    // View Transactions history by customer Id 
    router.get("/:id", transactions.getByCustomerId);
  
    app.use('/api/transactions', router);
  };
  