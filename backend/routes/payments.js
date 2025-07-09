const express = require('express');
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get payment history for current user
router.get('/', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new payment
router.post('/', auth, async (req, res) => {
  try {
    const payment = new Payment({ ...req.body, user: req.user._id });
    await payment.save();
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
