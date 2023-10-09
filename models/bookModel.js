const moongose = require("mongoose");
const bookingSchema = new moongose.Schema({
  tourId: {
    type: String,
    required: [true, "Need tour id for booking"],
  },
  userId: {
    type: String,
    required: true,
  },
  BookingDate: {
    type: Date,
    // min: 2023 - 9 - 30,
    // max: 2023 - 10 - 10,
  },
  TripDate: {
    type: Date,
    // min: 2023 - 10 - 15,
    // max: 2023 - 11 - 15,
  },
  noOfPerson: {
    type: Number,
    min: [3, "A Tour need at least 3 persons"],
    max: [15, "A Tour have limit to 15 persons"],
    required: true,
  },
  description : {
    type : String
  },
  status : {
    type : String,
    default : "booked"
  }
}, {
  timestamps : true,
});
const Booking = moongose.model("mybook", bookingSchema);

module.exports = Booking;