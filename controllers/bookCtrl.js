const Booking = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Booking.find();
        res.status(200).json({
            status: "success",
            books,
        });
    } catch(err) {
        res.status(401).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getOneBook = async (req, res) => {
    try {
        const book = await Booking.findById(req.params.id);
        res.status(200).json({
            status: "success",
            book,
        });
    } catch(err) {
        res.status(401).json({
            status: "fail",
            message: "Something went wrong",
            error: err,
        });
    }
};

exports.addNewBook = async (req, res) => {
    try {
      const newBook = await Booking.create(req.body);
      res.status(200).json({
        status: "success",
        message: "Booking has been added successfully.",
        Booking: newBook,
      });
    } catch (err) {
      console.log(err);
      res.status(401).json({
        status: "fail",
        message: `${err.message} ${err.name}`,
      });
    }
};

exports.updateOneBook = async (req, res) => {
    try {
        const newBook = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json({
            status: "success",
           message: "Booking has been updated successfully.",
           book: newBook, 
        });
    } catch(err) {
        res.status(401).json({
            status: "fail",
            message: "Something went wrong",
            error: err,
        });
    }
};

exports.deleteOneBook = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "scuuess",
            message: "Booking has been deleted successfully."
        });
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: "Error whild deleting booking",
        });
    }
};

exports.deleteAllBook = async (req, rs) => {
    try {
        await Booking.deleteMany();
        res.status(204).json({
            status: "Success",
            message: "Booking has been delted successfully.",
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: "Error whild deleting",
        })
    }
}

exports.checkBody = (req, res, next) => {
    console.log(req.body);
    console.log(">> this is checkbody middleware");
    if (!req.body.name) {
        return res.status(400).json({
            status: "fail",
            message: "Missing name",
        });
    }
    next();
};