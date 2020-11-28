/**
 * The model is of the customer which is responsible for purchases
 */
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error("Email is not invalid");
      }
    },
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  tokens: [
    {
      token: {
        required: true,
        type: String,
      },
    },
  ],
  time: { type: Date, default: Date.now },
});

customerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  delete customerObject.password;
  delete customerObject.tokens;
  return customerObject;
};

customerSchema.methods.generateAuthToken = async function () {
  const customer = this;
  const token = jwt.sign(
    { _id: customer.id.toString() },
    process.env.AUTH_TOKEN_KEY
  );
  customer.tokens = customer.tokens.concat({
    token,
  });
  await customer.save();
  return token;
};

customerSchema.statics.findByCredentials = async (email, password) => {
  const customer = await Customer.findOne({ email });
  if (!customer) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return customer;
};

customerSchema.pre("save", async function (next) {
  const customer = this;

  if (customer.isModified("password")) {
    customer.password = await bcrypt.hash(customer.password, 8);
  }

  next();
});

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
