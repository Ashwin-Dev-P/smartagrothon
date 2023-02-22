const express = require("express");
const router = express.Router();

//controller
const product_controllers = require("../../controllers/product.controller");

//upload controller
router.post(
	"/",

	product_controllers.uploadProductController,
);

router.get("/fruits", product_controllers.getFruitsController);

router.get("/vegetables", product_controllers.getVegetablesController);

router.get("/details/:_id", product_controllers.getProductDetailsController);

router.post("/statistics", product_controllers.getProductDataController);

module.exports = router;
