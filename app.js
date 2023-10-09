const express = require("express");
// const morgan = require("morgan");
const app = express();

const tourRouter = require("./routers/tourRoute");
const userRouter = require("./routers/userRoute");
const myLogger = require("./middleware/logger");
const reqTime = require("./middleware/reqTime");
const bookRouter = require("./routers/bookRoute");



app.use(express.json());
app.use(myLogger);
app.use(reqTime);
// app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.end({ message: "Hello from Express" });
});


app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

module.exports = app;
