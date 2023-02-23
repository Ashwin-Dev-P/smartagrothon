const mongoose = require("mongoose");

/*
type
0 - farmer
1 - consumer
2 - admin
*/

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
		type: {
			type: Number,
			default: 0,
		},
		address: {
			type: String,
			default: "",
		},
		phone_number: {
			type: String,
			default: "",
		},
		cart: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "product",
			},
		],
		location: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);

mongoose.model("user", userSchema);
