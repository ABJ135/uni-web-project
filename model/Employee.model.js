const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const employeeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    address: { type: String },
    phone_number: { type: String },
    job_role: { type: String },
    department: { type: String },
    salary: { type: Number },
    joining_date: { type: Date, default: Date.now },
  }, { timestamps: true });

  const employee = mongoose.model('employee',employeeSchema)

  module.exports = employee