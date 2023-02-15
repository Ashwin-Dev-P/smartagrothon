const mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: false,
      minlength: 1,
      default: "",
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: Number,

      default: 0,
    },
    farmer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("product", productSchema);
