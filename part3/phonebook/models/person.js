const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    // required: true,
    minLength: 8,
    validate: {
      validator: (v) => {
        const reg1 = /^\d{8,}/;
        const reg2 = /^\d{2}-\d{5,}/;
        const reg3 = /^\d{3}-\d{4,}/;
        return reg1.test(v) || reg2.test(v) || reg3.test(v);
      },
      message: (props) => `${props.value} is not a valid number!`
    }
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
