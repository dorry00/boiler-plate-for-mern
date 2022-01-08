const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 6,
  },
   isAdmin: {
       type:Boolean,
    default: false,
      },
  profilepic: String,
  AccessToken: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
},{timestamps:true});

//generate authToken

module.exports = mongoose.model("User", userSchema);
