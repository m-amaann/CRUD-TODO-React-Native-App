
// In here i have provided the Mongo DB connection writed codes

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
 const conn = await mongoose.connect(process.env.MONGOURI);

  console.log("MongoDB database has connected");
};

module.exports = connectDB;


