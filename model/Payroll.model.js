const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const payrollSchema = new Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    basic_salary: { type: Number, required: true },
    overtime_hours: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    bonuses: { type: Number, default: 0 },
    net_salary: { type: Number, required: true },
    generated_date: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  const payroll = mongoose.model('payroll', payrollSchema);

  module.exports = payroll
  