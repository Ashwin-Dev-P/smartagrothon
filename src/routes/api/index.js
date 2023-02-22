const express = require("express");
const router = express.Router();

//import controller
const shared_controllers = require("../../controllers/shared.controller");

//import routes
const user_routes = require("./user.routes");
const product_routes = require("./product.routes");
const payment_routes = require("./payment.routes");
const order_routes = require("./order.routes");

//routes
router.use("/user", user_routes);
router.use("/product", product_routes);
router.use("/payment", payment_routes);
router.use("/order", order_routes);

// //paytm=======================================

// app.use("/", require("./routes/server"));

// // =============================================

//Method or route not found
router.all("*", shared_controllers.method_not_found_controller);

module.exports = router;
