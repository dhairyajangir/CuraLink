const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  records: [
    {
      date: { type: Date, default: Date.now },
      description: String,
      files: [String],
    },
  ],
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
