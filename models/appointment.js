const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
 
