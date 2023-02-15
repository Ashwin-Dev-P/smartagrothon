//import services
const product_services = require("../services/product.services");

//controllers
const uploadProductController = async (req, res) => {
  if (!req.body) {
    console.error("No request body found");
    const result = {
      message: "Something went wrong",
      status: 400,
    };
    return res.status(400).json(result);
  }

  const { name, price, description, quantity, image, type, farmer_id } =
    req.body;

  const result = await product_services.uploadProductService(
    name,
    price,
    description,
    quantity,
    image,
    type,
    farmer_id
  );
  return await res.status(200).json(result);
};

module.exports = {
  uploadProductController,
};
