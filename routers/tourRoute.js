const express = require("express");
const tourCtrl = require("../controllers/tourCtrl");

const tourRouter = express.Router();

tourRouter
  .route("/")
  .get(tourCtrl.getAllTours)
  .delete(tourCtrl.deleteAllTour)
  .post(tourCtrl.addNewTours, tourCtrl.checkBody);



tourRouter
  .route("/:id")
  .get(tourCtrl.getOneTour)
  .patch(tourCtrl.updateOneTour)
  .delete(tourCtrl.deleteOneTour);

// tourRouter.param("id", tourCtrl.checkID);

module.exports = tourRouter;