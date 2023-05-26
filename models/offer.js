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
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: Array,
    },
    color: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("offer", Offerschema);
