const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("./models/tourModel");

const data = fs.readFileSync(`${__dirname}/data/tours.json`, "utf-8");
var tours = JSON.parse(data);

mongodbUrl =
  "mongodb+srv://aungmyothu:8ALIyk2k4Sh0ebLi@newmorningtour.hpz6puv.mongodb.net/";

mongoose
  .connect(mongodbUrl)
  .then((con) => {
    console.log("DB connection Successful.");
  })
  .catch((err) => {
    console.log("Error");
  });

const importData = async () => {
  await Tour.insertMany(tours);
  console.log("Data Successfully Loaded!");
};

importData();
