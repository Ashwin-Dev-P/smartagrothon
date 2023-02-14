const mongoose = require("mongoose");

//To remove deprecation warning
mongoose.set('strictQuery', true);

//Constants
const USE_MONGODB_ATLAS = process.env.USE_MONGODB_ATLAS;
const DB_NAME = process.env.DB_NAME;
const DATABASE_URI = process.env.DATABASE_URI;

var uri;
if (USE_MONGODB_ATLAS === true || process.env.NODE_ENV === "production") {
  //Uses mongodb atlas cloud service
  console.info("Using cloud mongodb Atlas storage");
  uri = DATABASE_URI;
} else {
  //Uses mongodb compass localhost storage
  console.info("Using local mongodb compass database");
  uri = `mongodb://0.0.0.0:27017/${DB_NAME}`;
}

mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (error) {
        console.error(
          "Error connecting to the database"
        );
        console.error(uri,error);
  
        
      } else {
        console.info("Connected to database successfully");
      }
    }
  );