const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name."],
        unique: true,
      },
      price: Number,
      duration: Number,
    });
    
const User = mongoose.model("myUser", userSchema); // MODEL
  
module.exports = User;