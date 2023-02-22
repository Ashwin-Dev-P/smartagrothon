/*
status
0 pending
1 transportation
2 delivered

*/

const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
	{
		product_ids: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "product",
			},
		],

		consumer_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},

		farmer_ids: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
			},
		],
		status: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

mongoose.model("order", orderSchema);
