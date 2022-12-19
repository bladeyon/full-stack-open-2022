const mongoose = require("mongoose");

console.log(process.argv);

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.natia0z.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (name && number) {
  const phonebook = new Phonebook({
    name,
    number
  });

  phonebook.save().then((res) => {
    console.log(`added ${name} ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Phonebook.find({}).then((res) => {
    console.log("phonebook:");
    res.forEach((item) => {
      console.log(item.name, item.number);
    });
    mongoose.connection.close();
  });
}
