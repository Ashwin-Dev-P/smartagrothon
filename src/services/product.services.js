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
  veg,
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
      veg,
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

//get vegetables
const getVegetablesService = async () => {
  try {
    var result;

    const vegetables = await product_repositories.getVegetablesRepository();

    result = {
      vegetables: vegetables,
      status: 200,
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

//get fruits
const getFruitsService = async () => {
  try {
    var result;

    const fruits = await product_repositories.getFruitsRepository();

    result = {
      fruits: fruits,
      status: 200,
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

//Get products of a farmer
const getProductByFarmerService = async (farmer_id) => {
  try {
    var result;

    const products = await product_repositories.getProductByFarmerRepository(
      farmer_id
    );

    result = {
      products: products,
      status: 200,
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

//Get product details service
const getProductDetailsService = async (_id) => {
  try {
    var result;

    const product_details =
      await product_repositories.getProductDetailsRepository(_id);

    result = {
      product_details,
      status: 200,
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
  getProductByFarmerService,
  getVegetablesService,
  getFruitsService,
  getProductDetailsService,
};
