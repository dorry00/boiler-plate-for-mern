const mongoose = require("mongoose");
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
    default:""
  },
  tokenExp: {
    type: Number,
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
