module.exports = app => {
    const Account = require("../controllers/account.controller.js");
  
    var router = require("express").Router();
  
    // Create account for already created customer Id
    router.post("/:id", Account.create);

    // View accounts by customer Id
    router.get("/:id", Account.getByCustomerId);

    // Deposits to Customer's account
    router.post("/deposit", Account.deposit);
  
    // Credits to customer's account
    router.post("/credit", Account.credit);

     // Transfer money from customer's account to another
     router.post("/transfer", Account.transfer);

    app.use('/api/accounts', router);
  };
  