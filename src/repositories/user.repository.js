//Modules
const mongoose = require("mongoose");

//Models

const UserModel = mongoose.model("user");

//repositories

//view profile
const getUserByIdRepository = async (user_id) => {
  const select = "-__v -updatedAt -password -createdAt";
  return await UserModel.findById(user_id).select(select).lean();
};

const createUser = async (
  email,
  hashed_password,
  username,
  address,
  phone_number,
  type
) => {
  const user = new UserModel();

  user.username = username;

  user.password = hashed_password;
  user.email = email;

  user.address = address;
  user.phone_number = phone_number;
  user.type = type;

  console.time("\nUser save time");
  await user.save();
  console.timeEnd("\nUser save time");

  delete user.password;
  return user;
};

//Used for login
const get_user_by_email_repository = async (email) => {
  const filter = {
    email: email,
  };

  const select = "_id email password username type phone_number address";
  const user = await UserModel.findOne(filter)
    .select(select)

    .lean();
  return user;
};

const user_exists_repository = async (filter) => {
  const result = await UserModel.exists(filter).lean();
  return result;
};

module.exports = {
  user_exists_repository,
  createUser,
  get_user_by_email_repository,
  getUserByIdRepository,
};
