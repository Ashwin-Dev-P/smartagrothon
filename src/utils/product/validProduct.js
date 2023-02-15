//shared utils
const { isValidObjectId } = require("mongoose");
const throwError = require("../shared/throwError");

const validProduct = async (name, price, quantity, image, farmer_id) => {
  if (!name) {
    await throwError(400, "Enter the name of the product");
  }

  if (!image) {
    await throwError(400, "Enter an url for the image");
  }

  if (!quantity) {
    await throwError(400, "Enter the quantity");
  }

  if (!price) {
    await throwError(400, "Enter the price");
  }

  if (!(await isValidObjectId(farmer_id))) {
    console.error("Invalid farmer id");
    await throwError(500, "Something went wrong");
  }
};

module.exports = validProduct;
