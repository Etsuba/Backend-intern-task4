const mongoose = require('mongoose');

// USER MODEL: Handles both Employers and Candidates
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['candidate', 'employer'], default: 'candidate' }
});

// JOB MODEL: Created by Employers
const jobSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    location: String,
    salary: String,
    requirements: [String],
    postedAt: { type: Date, default: Date.now }
});

// APPLICATION MODEL: Links Candidates to Jobs
const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumePath: { type: String, required: true }, // URL or file path
    status: { type: String, enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'], default: 'Pending' },
    appliedAt: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Job: mongoose.model('Job', jobSchema),
    Application: mongoose.model('Application', applicationSchema)
};