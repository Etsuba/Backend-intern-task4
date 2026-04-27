const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filePath: { type: String, required: true },
  fileName: String,
  version: String,
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);