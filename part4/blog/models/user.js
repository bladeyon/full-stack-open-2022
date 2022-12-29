const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, minLength: 3 },
  password: { type: String, minLength: 3 },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    const user = { ...ret };
    user.id = user._id.toString();
    delete user._id;
    delete user.__v;
    delete user.password;
    return user;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
