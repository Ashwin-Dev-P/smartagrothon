//Modules
const mongoose = require("mongoose");

//Models
const ProductModel = mongoose.model("product");

//Get products
const getProductByFarmerRepository = async (user_id) => {
  const filter = {
    farmer_id: user_id,
  };
  const products = await ProductModel.findAll(filter).lean();
  return products;
};

//Upload product
const uploadProductRepository = async (
  name,
  price,
  description,
  quantity,
  image,
  type,
  farmer_id
) => {
  var product_object = await new ProductModel();

  product_object.name = name;
  product_object.price = price;
  product_object.description = description;
  product_object.quantity = quantity;
  product_object.image = image;
  product_object.type = type;
  product_object.farmer_id = farmer_id;

  await product_object.save();

  return product_object;
};

module.exports = {
  getProductByFarmerRepository,
  uploadProductRepository,
};
