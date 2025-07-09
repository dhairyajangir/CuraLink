const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all appointments for current user
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id }).populate('doctor');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Book new appointment
router.post('/', auth, async (req, res) => {
  try {
    const appointment = new Appointment({ ...req.body, patient: req.user._id });
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (appointment.patient.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Unauthorized' });
    await appointment.remove();
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
