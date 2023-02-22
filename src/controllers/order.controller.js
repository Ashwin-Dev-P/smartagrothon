//services
const order_services = require("../services/order.services");

//controllers
const makeOrderController = async (req, res) => {
	const { consumer_id, product_ids, farmer_ids } = req.body;

	const result = await order_services.makeOrdersService(
		consumer_id,
		product_ids,
		farmer_ids,
	);
	return await res.status(result.status).json(result);
};

const getOrderHistoryController = async (req, res) => {
	const { consumer_id, status } = req.body;

	const result = await order_services.getOrderHistoryService(
		consumer_id,
		status,
	);
	return await res.status(result.status).json(result);
};

const getOrderHistoryForFarmerController = async (req, res) => {
	const { farmer_id, status } = req.body;

	const result = await order_services.getOrderHistoryForFarmerService(
		farmer_id,
		status,
	);
	return await res.status(result.status).json(result);
};

module.exports = {
	makeOrderController,
	getOrderHistoryController,
	getOrderHistoryForFarmerController,
};
