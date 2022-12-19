require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    required: true
  }
});

personSchema.set("toJSON", {
  transform: (doc, res) => {
    res.id = res._id.toString();
    delete res._id;
    delete res.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);
