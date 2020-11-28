/**
 * The model refers to the item the user purchase
 * Item Name
 * Item Unit Price
 * Item quantity
 * Logo
 */
const mongoose = require("mongoose");
const purchaseItemSchema = new mongoose.Schema({
  purchaseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Purchases",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Purchase quantity can not be less then one"],
  },
});

const PurchaseItem = mongoose.model("PurchaseItem", purchaseItemSchema);
module.exports = PurchaseItem;
