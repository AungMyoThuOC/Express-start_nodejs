const express = require("express");
const bookCtrl = require("../controllers/bookCtrl");

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(bookCtrl.getAllBooks)
  .delete(bookCtrl.deleteAllBook)
  .post(bookCtrl.addNewBook, bookCtrl.checkBody);

bookRouter
  .route("/:id")
  .get(bookCtrl.getOneBook)
  .patch(bookCtrl.updateOneBook)
  .delete(bookCtrl.deleteOneBook);

module.exports = bookRouter;
