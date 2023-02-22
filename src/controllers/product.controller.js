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

	const { name, price, description, quantity, image, veg, farmer_id } =
		req.body;

	const result = await product_services.uploadProductService(
		name,
		price,
		description,
		quantity,
		image,
		veg,
		farmer_id,
	);
	return await res.status(200).json(result);
};

const getFruitsController = async (req, res) => {
	const result = await product_services.getFruitsService();
	return await res.status(result.status).json(result);
};

const getVegetablesController = async (req, res) => {
	const result = await product_services.getVegetablesService();
	return await res.status(result.status).json(result);
};

const getProductDetailsController = async (req, res) => {
	const { _id } = req.params;
	const result = await product_services.getProductDetailsService(_id);
	return await res.status(result.status).json(result);
};

const getProductDataController = async (req, res) => {
	const { farmer_id } = req.body;
	const result = await product_services.getStatisticsService(farmer_id);
	return await res.status(result.status).json(result);
};

module.exports = {
	uploadProductController,
	getFruitsController,
	getVegetablesController,
	getProductDetailsController,
	getProductDataController,
};
