/**
 The model refers to the purchase of the customer
 * Fields are
 * Brand Name 
 * Brand Logo
 * Total Purchase Amount
 * Category Of Purchase
 * Timestamp
 * List of PurchaseItems
 * Location
 */

const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customers",
  },
  brandName: {
    type: String,
    required: true,
    trim: true,
  },
  brandLogo: {
    type: String,
  },
  totalPurchaseAmount: {
    type: Number,
    required: true,
    min: [0, "The purchase amount can't be negative."],
  },
  category: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  items: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        logo: {
          type: String,
          trim: true,
        },
      },
    ],
    validate: [minItemCount, "Min one items for purchase required"],
  },

  createdAt: { type: Date, default: Date.now },
});

function minItemCount(val) {
  return val.length > 0;
}

purchaseSchema.methods.toJSON = function () {
  const purchase = this;
  const purchaseObject = purchase.toObject();
  delete purchaseObject.customerId;
  return purchaseObject;
};

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
