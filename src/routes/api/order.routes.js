const express = require("express");
const router = express.Router();

//import controllers
const order_controllers = require("../../controllers/order.controller");

//routes
router.post(
	"/",

	order_controllers.makeOrderController,
);

//get order history
router.post("/order_history", order_controllers.getOrderHistoryController);

//get order history
router.post(
	"/order_history_farmer",
	order_controllers.getOrderHistoryForFarmerController,
);

module.exports = router;
