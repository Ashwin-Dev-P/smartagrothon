//Modules
const mongoose = require("mongoose");

//Models
const ProductModel = mongoose.model("product");
const OrderModel = mongoose.model("order");

//NOT IN USE
//Get products
const getProductByFarmerRepository = async (farmer_id) => {
	const filter = {
		farmer_id: farmer_id,
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
	veg,
	farmer_id,
) => {
	var product_object = await new ProductModel();

	product_object.name = name;
	product_object.price = price;
	product_object.description = description;
	product_object.quantity = quantity;
	product_object.image = image;
	product_object.veg = veg;
	product_object.farmer_id = farmer_id;

	await product_object.save();

	return product_object;
};

//get fruits
const getFruitsRepository = async () => {
	filter = {
		veg: false,
	};
	const select =
		"name price description quantity image farmer_id createdAt description";
	const products = await ProductModel.find(filter)
		.select(select)
		.sort({ createdAt: -1 })
		.lean();
	return products;
};

//get vegetables
const getVegetablesRepository = async () => {
	filter = {
		veg: true,
	};
	const select =
		"name price description quantity image farmer_id createdAt description";
	const products = await ProductModel.find(filter)
		.select(select)
		.sort({ createdAt: -1 })
		.lean();
	return products;
};

const getProductDetailsRepository = async (_id) => {
	const select = "-__v -updatedAt -createdAt -farmer_id";
	const product_details = await ProductModel.findById(_id)
		.select(select)
		.lean();
	return product_details;
};

const getProductsOfFarmerRepository = async (farmer_id) => {
	const filter = {
		farmer_id: farmer_id,
	};

	const select = "-__v -farmer_id";
	const product = await ProductModel.find(filter).select(select).lean();

	return product;
};

const getProductDataForAFarmerRepository = async (farmer_id) => {
	const veg = await ProductModel.find({ farmer_id, veg: true }).count();
	const fruit = await ProductModel.find({ farmer_id, veg: false }).count();

	const processing = await OrderModel.find({
		farmer_ids: farmer_id,
		status: 0,
	}).count();
	const shipping = await OrderModel.find({
		farmer_ids: farmer_id,
		status: 1,
	}).count();
	const delivered = await OrderModel.find({
		farmer_ids: farmer_id,
		status: 0,
	}).count();

	const data = {
		veg: veg,
		fruit: fruit,
		processing,
		shipping,
		delivered,
	};

	return data;
};

module.exports = {
	getProductByFarmerRepository,
	uploadProductRepository,
	getVegetablesRepository,
	getFruitsRepository,
	getProductDetailsRepository,
	getProductByFarmerRepository,
	getProductsOfFarmerRepository,
	getProductDataForAFarmerRepository,
};
