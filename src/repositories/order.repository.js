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

module.exports = {
	submitOrderRepository,
};
