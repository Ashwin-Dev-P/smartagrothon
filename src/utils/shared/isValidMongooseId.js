var ObjectId = require("mongoose").Types.ObjectId;

const isValidMongooseId = async (_id) => {
  return await ObjectId.isValid(_id);
};

module.exports = isValidMongooseId;
