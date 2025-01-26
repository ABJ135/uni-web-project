const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const LeaveSchema = new Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    leave_type: { type: String, enum: ['sick', 'vacation', 'casual'], required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    reason: { type: String },
  }, { timestamps: true });

const leave = mongoose.model('leave',LeaveSchema)

module.exports = leave