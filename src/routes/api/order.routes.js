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

module.exports = router;
