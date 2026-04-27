const notifyCandidate = async (candidateId, message) => {
  console.log(`📧 Notification to candidate ${candidateId}: ${message}`);
  // Later: integrate nodemailer or send via Socket.io / Firebase
};

module.exports = { notifyCandidate };