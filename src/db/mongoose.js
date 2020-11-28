const mongoose = require("mongoose");
const { url } = require("../config/mongoConfig");

async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(console);
  }
}

module.exports = {
  connect,
};
