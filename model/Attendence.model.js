const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const attendenceSchema = new Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: { type: String, required: true },
    clock_in: { type: String },
    clock_out: { type: String },
    status: {
      type: String,
      enum: ["present", "absent", "late"],
      required: true,
    },
  },
  { timestamps: true }
);

const attendence = mongoose.model("attendence", attendenceSchema);

module.exports = attendence;
