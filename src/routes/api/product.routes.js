const express = require("express");
const router = express.Router();

//controller
const product_controllers = require("../../controllers/product.controller");

//upload controller
router.post(
  "/",

  product_controllers.uploadProductController
);

module.exports = router;
