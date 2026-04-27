const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { employerOnly } = require('../middleware/role');
const { getJobs, postJob } = require('../controllers/jobController');

router.get('/', getJobs);                    // Public search
router.post('/', protect, employerOnly, postJob); // Only employers

// Add more routes: /myjobs, /:id etc.

module.exports = router;