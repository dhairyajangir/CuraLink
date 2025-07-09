const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialty: { type: String, required: true },
  hospital: { type: String },
  availableSlots: [{ type: Date }],
  bio: { type: String },
});

module.exports = mongoose.model('Doctor', doctorSchema);
