const express = require("express");
const app = express();
const cors = require("cors");
const customerRouter = require("./routes/Customer");
const purchaseRouter = require("./routes/Purchase");
const auth = require("./middleware/auth");
const addRequestId = require("./middleware/requestId");

const db = require("./db/mongoose");
db.connect();

app.use(express.json());
app.use(cors());
app.use(addRequestId);
app.use(customerRouter);
app.use(auth);
app.use(purchaseRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

module.exports = app;
