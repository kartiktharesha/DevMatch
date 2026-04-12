const mongoose = require("mongoose");
const User = require("../models/user");
const userData = require("./userdata");
const Project = require("../models/project");
const projectdata = require("./projectdata");
const user = require("../models/user");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/devmatch");
  console.log("✅ Database connected successfully");
}

main()
  .then(initDB)
  .catch(err => console.log(err));

  // function  database with sample data.

async function initDB() {
  try {
   await user.deleteMany({});
   await user.insertMany(userData.data);
    
    await Project.deleteMany({});
    await Project.insertMany(projectdata.data);

    console.log("✅ Data inserted successfully");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
}