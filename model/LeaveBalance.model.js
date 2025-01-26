const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const LeaveBalanceSchema = new Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    leave_type: { type: String, enum: ['sick', 'vacation', 'casual'], required: true },
    total_allocated: { type: Number, required: true },
    used: { type: Number, default: 0 },
    remaining: { type: Number, required: true },
  }, { timestamps: true });

  const leaveBalance = mongoose.model("leaveBalance",LeaveBalanceSchema)

  module.exports = leaveBalance