const express = require("express");
const router = express.Router();

//import controllers
const user_controllers = require("../../controllers/user.controller");

//routes

//view profile
router.get("/profile/:user_id", user_controllers.viewProfileController);

//login user
router.post(
  "/login",

  user_controllers.login_user_controller
);

//register user
router.post(
  "/",

  user_controllers.register_user_controller
);

//logout
router.post("/logout", user_controllers.logout_controller);

//add to cart
router.post(
  "/add_to_cart/product_id/:product_id",
  user_controllers.addToCartController
);

//view cart
router.post("/view_cart", user_controllers.viewCartController);

//update location
router.put("/location",user_controllers.updateLocationController);

//get farmers
router.get("/farmers",user_controllers.getFarmersController);

module.exports = router;
