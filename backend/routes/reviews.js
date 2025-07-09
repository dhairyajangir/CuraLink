const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

// Get reviews for a doctor
router.get('/:doctorId', async (req, res) => {
  try {
    const reviews = await Review.find({ doctor: req.params.doctorId }).populate('patient', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review for a doctor
router.post('/:doctorId', auth, async (req, res) => {
  try {
    const review = new Review({ ...req.body, doctor: req.params.doctorId, patient: req.user._id });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
