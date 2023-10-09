// const fs = require("fs");
const Tour = require("../models/tourModel");

// const data = fs.readFileSync(`${__dirname}/../data/tours-simple.json`, "utf-8");
// var tours = JSON.parse(data);


exports.getAllTours = async (req, res) => {
  // 1. Filtering
  // console.log(req.query);
  // const tours = await Tour.find(req.query);
  try {
    console.log(req.query);
    // 1.1 Remove Unwanted Query e.g., page, sort, fields, limit
    const queryObj = {...req.query};
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    console.log(req.query, queryObj);
    // const tours = await Tour.find(queryObj);

    //1.2 Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // query build => Select * from tours where dration =5
    let query = Tour.find(JSON.parse(queryStr));

    // 2 Sorting
    if (req.query.sort) {
      // sorting
      // query = query.sort(req.query.sort); // query => Select * form tours where duration =5 order by price , duration
      //2.1 Multiple Sorting
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const tours = await query;

    res.status(200).json({
      status: "success",
      length: tours.length,
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
      message: 'Something went wrong',
      error: err,
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
      status: "success",
      message: "Tour has been added successfully.",
      tour: newTour,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
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
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      message: "Tour has been updated successfully.",
      tour: newTour,
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: "Something went wrong",
      error: err,
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
    res.status(204).json({
      status: "Success",
      message: "Tour has been deleted successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: "Error whild deleting tour",
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

exports.deleteAllTour = async (req, res) => {
  try {
    await Tour.deleteMany();
    res.status(204).json({
      status: "Success",
      message: "Tour has been deleted successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: "Error whild deleting tour",
    });
  }
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