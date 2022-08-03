const express = require('express');
const cors = require("cors");

const app = express();
const port = 3000;

var corsOptions = {
    origin: `http://localhost:${port}`
  };

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/customer.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/transaction.routes")(app);

app.get('/', (req, res) => {
  res.send('Welcome to Banking API!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});