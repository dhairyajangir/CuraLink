const express = require('express');
const HealthRecord = require('../models/HealthRecord');
const auth = require('../middleware/auth');

const router = express.Router();

// Get health records for current user
router.get('/', auth, async (req, res) => {
  try {
    const records = await HealthRecord.findOne({ patient: req.user._id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new health record
router.post('/', auth, async (req, res) => {
  try {
    let record = await HealthRecord.findOne({ patient: req.user._id });
    if (!record) {
      record = new HealthRecord({ patient: req.user._id, records: [req.body] });
    } else {
      record.records.push(req.body);
    }
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
