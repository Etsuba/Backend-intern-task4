const Application = require('../models/Application');
const Job = require('../models/Job');
const { notifyCandidate } = require('../utils/notify');

const applyJob = async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const resumeId = req.body.resumeId; // from uploaded resume

  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  const existing = await Application.findOne({ job: jobId, candidate: req.user._id });
  if (existing) return res.status(400).json({ message: 'Already applied' });

  const application = await Application.create({
    job: jobId,
    candidate: req.user._id,
    resume: resumeId,
    coverLetter
  });

  res.status(201).json(application);
};

const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id).populate('job');

  if (application.job.employer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  application.status = status;
  await application.save();

  // Notify candidate
  await notifyCandidate(application.candidate, `Your application status for ${application.job.title} is now ${status}`);

  res.json(application);
};

module.exports = { applyJob, updateApplicationStatus };