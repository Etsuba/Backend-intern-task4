const express = require('express');
const mongoose = require('mongoose');
const { User, Job, Application } = require('./models/Schemas');
const upload = require('./middleware/upload');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Make uploads folder public

// 1. POST A JOB (Employer)
app.post('/api/jobs', async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json({ message: "Job Posted!", job });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. SEARCH JOBS (With Filters)
app.get('/api/jobs', async (req, res) => {
    const { title, location } = req.query;
    let filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };

    const jobs = await Job.find(filter).populate('employer', 'name email');
    res.json(jobs);
});

// 3. APPLY FOR A JOB (Candidate + Resume Upload)
app.post('/api/applications', upload.single('resume'), async (req, res) => {
    try {
        const newApplication = new Application({
            job: req.body.jobId,
            candidate: req.body.candidateId,
            resumePath: req.file.path
        });
        await newApplication.save();
        res.status(201).json({ message: "Application Submitted!", newApplication });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. TRACK APPLICATIONS (Employer view)
app.get('/api/applications/employer/:employerId', async (req, res) => {
    // Find all jobs by this employer
    const jobs = await Job.find({ employer: req.params.employerId });
    const jobIds = jobs.map(j => j._id);
    
    // Find applications for those jobs
    const applications = await Application.find({ job: { $in: jobIds } })
        .populate('job', 'title')
        .populate('candidate', 'name email');
    res.json(applications);
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(3000, () => console.log("Server running on port 3000")))
    .catch(err => console.log(err));