const express = require("express");
const router = express.Router();

//import controllers
const order_controllers = require("../../controllers/order.controller");

//routes
router.post(
	"/",

	order_controllers.makeOrderController,
);

module.exports = router;
