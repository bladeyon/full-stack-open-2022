require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.set("toJSON", {
  transform: (doc, res) => {
    res.id = res._id.toString();
    delete res._id;
    delete res.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);
