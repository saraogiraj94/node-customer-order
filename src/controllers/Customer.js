const Customer = require("../models/Customer");

async function signup(req, res) {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).send({ customer });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}

async function login(req, res) {
  try {
    const customer = await Customer.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await customer.generateAuthToken();
    res.send({ customer, token });
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
}

module.exports = {
  signup,
  login,
};
