const mongoose = require('mongoose')
const {Schema} = require("mongoose")

const performanceEvaluationSchema = new Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review_period: { type: String, required: true },
    criteria: { type: Map, of: Number }, 
    feedback: { type: String },
    evaluator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  }, { timestamps: true });
  
  const performanceEvaluation = mongoose.model('performanceEvaluation', PerformanceEvaluationSchema);
  module.exports = performanceEvaluation