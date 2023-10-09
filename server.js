const morgan = require("morgan");
const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env",
});

var dbpass = process.env.DB_PASSWORD;

mongodbUrl = `mongodb+srv://aungmyothu:${dbpass}@newmorningtour.hpz6puv.mongodb.net/`;

mongoose
  .connect(mongodbUrl)
  .then((con) => {
    console.log("DB connection Successful.");
  })
  .catch((err) => {
    console.log("Error");
  });

const port = process.env.PORT;

console.log(process.env.NODE_ENV);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
