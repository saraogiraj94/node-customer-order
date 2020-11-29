const express = require("express");
const router = new express.Router();
const Purchase = require("../controllers/Purchase");

/**
 * Save purchase order
 */
router.post("/purchase", Purchase.save);

/**
 * Get List of purchases
 */
router.post("/purchases", Purchase.getAllOrders);

/**
 * Get Single Purchase by id
 */
router.get("/purchase", Purchase.getOrderById);

module.exports = router;
