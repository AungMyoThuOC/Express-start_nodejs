// const fs = require("fs");
const Tour = require("../models/tourModel");

// const data = fs.readFileSync(`${__dirname}/../data/tours-simple.json`, "utf-8");
// var tours = JSON.parse(data);


exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      tours: tours,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};


exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // console.log(req.params);
  // const id = req.params.id;
  // var tour = tours.find((el) => el.id == id);
  // // for (var i= 0; i< tours.length; i++) {
  // //   if(id == tours[i]["id"]){
  // //     tour = tours[i];
  // //     console.log(tour)
  // //   }
  // // }

  // if (!tour) {
  //   return res.status(200).json({
  //     status: "fail",
  //     message: "Tour doesn't exist",
  //   });
  // }

  // res.status(200).json({
  //   status: "success",
  //   tour,
  // });
};

exports.addNewTours = async (req, res) => {
try {
  const newTour = await Tour.create(req.body);

  res.status(200).json({
    status: "Success",
    message: "Tour has been added successfully.",
    tour : newTour
  });
} catch (err) {
  console.log(err);
  res.status(401).json ({
    status: "fail",
    message: `${err.message} ${err.name}`,
  });
}
  // console.log(req.body);
  // const newTour = req.body;

  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/../data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     if (err) {
  //       return res.status(500).json({
  //         status: "fail",
  //         message: "Something went wrong when adding data to database",
  //       });
  //     }

  //     return res.status(200).json({
  //       status: "success",
  //       message: "Successfully added a tour to database",
  //       tour: newTour,
  //     });
  //   }
  // );
};

exports.updateOneTour = async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  try {
    res.status(200).json({
      status: 'success',
      message: "Tour has been updated successfully.",
      tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // console.log(req.body);
  // const id = req.params.id;

  // var tour = tours.find((el) => el.id == id);

  // let index = tours.indexOf(tour);

  // Object.assign(tour, req.body);

  // tours[index] = tour;

  // fs.writeFile(
  //   `${__dirname}/../data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     if (err) {
  //       return res.status(500).json({
  //         status: "fail",
  //         message: "Something went wrong when adding data to database",
  //       });
  //     }

  //     return res.status(200).json({
  //       status: "success",
  //       message: "Successfully added a tour to database",
  //       // tour: newTour,
  //     });
  //   }
  // );

  // res.status(200).json({
  //   status: "scuuess",
  //   message: "Tour has been updated successfully.",
  // });
};

exports.deleteOneTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      data: null,
      message: "Tour has been deleted successfully.",
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // console.log(req.body);
  // const id = req.params.id;

  // var tour = tours.find((el) => el.id == id);

  // const index = tours.indexOf(tour);

  // tours.splice(index, 1);

  // fs.writeFile(
  //   `${__dirname}/../data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     if (err) {
  //       return res.status(500).json({
  //         status: "fail",
  //         message: "Something went wrong when delete data to database",
  //       });
  //     }

  //     return res.status(200).json({
  //       status: "success",
  //       message: "Tour has been deleted successfully.",
  //       // tour: newTour,
  //     });
  //   }
  // );

  // if (!tour) {
  //   return res.status(200).json({
  //     status: "fail",
  //     message: "tour doesn't exist",
  //   });
  // }

  // res.status(200).json({
  //   status: "scuuess",
  //   message: "Tour has been deleted successfully.",
  // });
};

exports.deleteAllTour = (req, res) => {
  // tour = [];

  // fs.writeFile(
  //   `${__dirname}/../data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     if (err) {
  //       return res.status(500).json({
  //         status: "fail",
  //         message: "Something went wrong when adding data to database",
  //       });
  //     }

  //     return res.status(200).json({
  //       status: "success",
  //       message: "Successfully deleted",
  //     });
  //   }
  // );
};

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing price or name",
    });
  }
}