//import repo
const order_repositories = require("../repositories/order.repository");

//services
const makeOrdersService = async (consumer_id, product_ids, farmer_ids) => {
	try {
		await order_repositories.submitOrderRepository(
			consumer_id,
			product_ids,
			farmer_ids,
		);

		const result = {
			message: "Order submitted",
			status: 200,
		};

		return result;
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);
		const result = {
			message: error.status === 400 ? error.message : "Something went wrong",
			status: error.status || 500,
		};
		return result;
	}
};

//get order history
const getOrderHistoryService = async (consumer_id, status) => {
	try {
		const order_history = await order_repositories.getOrderHistoryRepository(
			consumer_id,
			status,
		);

		const result = {
			order_history,
			status: 200,
		};

		return result;
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);
		const result = {
			message: error.status === 400 ? error.message : "Something went wrong",
			status: error.status || 500,
		};
		return result;
	}
};

module.exports = {
	makeOrdersService,
	getOrderHistoryService,
};
