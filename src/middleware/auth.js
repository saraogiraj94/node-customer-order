const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.AUTH_TOKEN_KEY);
    //TODO : use session storage here
    const customer = await Customer.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!customer) {
      throw new Error();
    }
    req.customerId = decoded._id;
    req.token = token;
    next();
  } catch {
    res.status(401).send({
      error: "please authenticate",
    });
  }
};
module.exports = auth;
