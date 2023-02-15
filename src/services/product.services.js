//import repo
const product_repositories = require("../repositories/product.repository");

//utils
const validProduct = require("../utils/product/validProduct");

//SERVICES
const uploadProductService = async (
  name,
  price,
  description,
  quantity,
  image,
  type,
  farmer_id
) => {
  try {
    var result;

    await validProduct(name, price, quantity, image, farmer_id);

    const product = await product_repositories.uploadProductRepository(
      name,
      price,
      description,
      quantity,
      image,
      type,
      farmer_id
    );

    result = {
      message: "Producted added",
      status: 200,
      product: product,
    };

    return result;
  } catch (error) {
    console.error("Try catch error caught");
    console.error(error);
    const result = {
      message: error.status === 400 ? error.message : "Something went wrong",
      status: error.status || 500,
    };
    return result;
  }
};

module.exports = {
  uploadProductService,
};
