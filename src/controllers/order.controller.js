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

module.exports = {
	makeOrderController,
};
