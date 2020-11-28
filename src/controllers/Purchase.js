const Purchase = require("../models/Purchase");

async function save(req, res) {
  const purchase = new Purchase(req.body);
  purchase.customerId = req.customerId;
  try {
    const savedPurchase = await purchase.save();
    res.status(201).send(savedPurchase);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getAllOrders(req, res) {
  try {
    const purchase = await Purchase.find({ customerId: req.customerId });
    if (!purchase) {
      res.sendStatus(404);
    }
    res.status(200).send(purchase);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getOrderById(req, res) {
  try {
    const purchase = await Purchase.findById(req.query.id);
    if (!purchase) {
      res.sendStatus(404);
    }
    res.status(200).send(purchase);
  } catch (err) {
    console.error(err);
    res.send(400);
  }
}

module.exports = {
  save,
  getAllOrders,
  getOrderById,
};
