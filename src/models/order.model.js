const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
	{
		cart: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "product",
			},
		],

		consumer_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		farmer_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{
		timestamps: true,
	},
);

mongoose.model("order", orderSchema);
