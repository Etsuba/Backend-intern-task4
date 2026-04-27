const Job = require('../models/Job');

const getJobs = async (req, res) => {
  const { keyword, location, jobType, minSalary } = req.query;
  
  let query = { isActive: true };

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ];
  }
  if (location) query.location = { $regex: location, $options: 'i' };
  if (jobType) query.jobType = jobType;
  if (minSalary) query.salaryMin = { $gte: Number(minSalary) };

  const jobs = await Job.find(query).populate('employer', 'name companyName companyLocation');
  res.json(jobs);
};

const postJob = async (req, res) => {
  const job = await Job.create({ ...req.body, employer: req.user._id });
  res.status(201).json(job);
};

// Add getMyJobs, updateJob, deleteJob similarly (employer only)

module.exports = { getJobs, postJob /* ... */ };