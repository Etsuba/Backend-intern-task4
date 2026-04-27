const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [String],
  location: { type: String, required: true },
  salaryMin: Number,
  salaryMax: Number,
  jobType: { 
    type: String, 
    enum: ['full-time', 'part-time', 'remote', 'contract', 'internship'],
    required: true 
  },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  deadline: Date,
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);