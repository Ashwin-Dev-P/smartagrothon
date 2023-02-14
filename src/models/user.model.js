const mongoose = require("mongoose");


var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 320,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
    },
    
  },
  {
    timestamps: true,
  }
);


mongoose.model("user", userSchema);