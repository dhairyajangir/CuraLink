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
    const appointmentData = { ...req.body, patient: req.user._id };
    const appointment = new Appointment(appointmentData);
    await appointment.save();

    // Populate doctor and patient details for the event
    await appointment.populate('doctor', 'name');
    await appointment.populate('patient', 'name');

    // Create notifications in the database
    const Notification = require('../models/Notification');
    const patientNotification = new Notification({
      user: req.user._id,
      message: `Your appointment with ${appointment.doctor.name} has been successfully booked.`
    });
    await patientNotification.save();

    const doctorNotification = new Notification({
      user: appointment.doctor._id,
      message: `You have a new appointment with ${appointment.patient.name}.`
    });
    await doctorNotification.save();

    // Emit real-time events to the specific users
    const io = req.io;
    io.to(req.user._id.toString()).emit('appointment_booked', appointment);
    io.to(req.user._id.toString()).emit('new_notification', patientNotification);
    io.to(appointment.doctor._id.toString()).emit('appointment_update', appointment);
    io.to(appointment.doctor._id.toString()).emit('new_notification', doctorNotification);

    res.status(201).json(appointment);
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
