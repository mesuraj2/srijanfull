const mongoose = require("mongoose");

const Offerschema = mongoose.Schema(
  {
    offername: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
    },
    locationdescription: {
      type: String
    },
    description: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    chat_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
      },
    ],
    Location: {
      type: {
        type: String
      },
      coordinates: [Number]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("offers", Offerschema);


// Old Schema

// offername: {
//   type: String,
//   required: true,
// },
// category: {
//   type: String,
//   required: true,
// },
// brand: {
//   type: String,
//   required: true,
// },
// quantity: {
//   type: Number,
//   required: true,
// },
// sold: {
//   type: Number,
//   default: 0,
// },
// image: {
//   type: Array,
// },
// color: {
//   type: String,
//   required: true,
// },
// description: {
//   type: String,
//   required: true,
// },
// ratings: [
//   {
//     star: Number,
//     postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//   },
// ],
// chat_id: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "chat",
//   },
// ],
// Location: {
//   type: {
//     type: String,
//   },
//   coordinates: [Number],
// },