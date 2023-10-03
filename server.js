const morgan = require("morgan");
const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env",
});

const port = process.env.PORT;
if (process.env.NODE_ENV == "devlopment") {
  app.use(morgan("tiny"));
}

var dbpass = process.env.DB_PASSWORD;

mongodbUrl = `mongodb+srv://aungmyothu:${dbpass}@newmorningtour.hpz6puv.mongodb.net/`;

mongoose.connect(mongodbUrl).then((con) => {
  console.log("DB connection Successful.");
});



// // DATA OBJECT
// const testTour = new Tour({
//   name: "Mandalay",
//   rating: 5,
//   price: 500,
// });

// testTour
//   .save()
//   .then((doc) => console.log(">>>>>>", doc))
//   .catch((err) => console.log("ERROR", err));

console.log(process.env.NODE_ENV);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
