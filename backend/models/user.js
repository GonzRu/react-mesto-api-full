const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const WrongLoginOrPasswordError = require('../errors/wrong-login-or-password-error');
const { linkRegExp } = require('../utils/validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    match: linkRegExp,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new WrongLoginOrPasswordError();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new WrongLoginOrPasswordError();
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
