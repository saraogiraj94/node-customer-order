const express = require("express");
const Customer = require("../controllers/Customer");
const router = new express.Router();

router.post("/customer/signup", Customer.signup);

router.post("/customer/login", Customer.login);

module.exports = router;
