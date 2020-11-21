const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// require('mongoose-type-email');

var passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema(
  {
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
      //   unique: true,
    },
  },
  {
    timestamps: true,
  }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);

// mongoose.SchemaTypes.Email
