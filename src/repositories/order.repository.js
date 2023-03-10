//Modules
const mongoose = require("mongoose");

//Models
const OrderModel = mongoose.model("order");

//Repositories
const submitOrderRepository = async (consumer_id, product_ids, farmer_ids) => {
	var orderObject = await new OrderModel();

	orderObject.product_ids = product_ids;
	orderObject.consumer_id = consumer_id;
	orderObject.farmer_ids = farmer_ids;

	await orderObject.save();
};

const getOrderHistoryRepository = async (consumer_id, status) => {
	console.log(consumer_id);
	const filter = {
		consumer_id: consumer_id,
		status: status,
	};
	const order_history = await OrderModel.find(filter)
		.select("product_ids createdAt updatedAt status")
		//.populate("farmer_ids", "address phone_number location username email")
		//.populate("consumer_id", "address phone_number location username email")
		.populate("product_ids", "name price image quantity")
		.sort("status -createdAt")
		.lean();

	return order_history;
};

const getOrderHistoryForFarmerRepository = async (farmer_id, status) => {
	console.log(farmer_id);
	const filter = {
		farmer_id: farmer_id,
		status: status,
	};
	const order_history = await OrderModel.find(filter)
		.select("product_ids createdAt updatedAt status")
		//.populate("farmer_ids", "address phone_number location username email")
		//.populate("consumer_id", "address phone_number location username email")
		.populate("product_ids", "name price image quantity")
		.sort("status -createdAt")
		.lean();

	return order_history;
};

module.exports = {
	submitOrderRepository,
	getOrderHistoryRepository,
	getOrderHistoryForFarmerRepository,
};
