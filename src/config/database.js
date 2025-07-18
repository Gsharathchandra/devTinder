const mongoose = require("mongoose");

const connectDB = async () => {
  
  await mongoose.connect("mongodb+srv://gumasthasharathchandra:4ZWWWhzFxjSBp5iU@cluster0.qj4eb72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devTinder");
};

module.exports = connectDB;