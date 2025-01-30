const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/hospitalDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Test route
app.get('/', (req, res) => {
  res.send('Hospital Management System Backend');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 
const Appointment = require('./models/appointment');
const Doctor = require('./models/doctor');
const Patient = require('./models/patient');

// Add a new appointment
app.post('/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(500).send({ message: 'Error adding appointment', error });
  }
});

// Get all appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.send(appointments);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching appointments', error });
  }
});

// Add a new doctor
app.post('/doctors', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(500).send({ message: 'Error adding doctor', error });
  }
});

// Get all doctors
app.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.send(doctors);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching doctors', error });
  }
});

// Add a new patient
app.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(500).send({ message: 'Error adding patient', error });
  }
});

// Get all patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.send(patients);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching patients', error });
  }
});

app.put('/doctors/:id', async (req, res) => {
  const doctorId = req.params.id;  // Get doctor ID from URL parameter
  const updatedData = req.body;    // Get updated data from the request body

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(updatedDoctor);  // Send back updated doctor data
  } catch (err) {
    console.error('Error updating doctor:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/doctors/:id', async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findByIdAndDelete(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});


app.put('/patients/:id', async (req, res) => {
  const patientId = req.params.id;  // Get patient ID from URL parameter
  const updatedData = req.body;    // Get updated data from the request body

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updatedData, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(updatedPatient);  // Send back updated patient data
  } catch (err) {
    console.error('Error updating patient:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/patients/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findByIdAndDelete(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.put('/appointments/:id', async (req, res) => {
  const appointmentId = req.params.id;  // Get appointment ID from URL parameter
  const updatedData = req.body;    // Get updated data from the request body

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, updatedData, { new: true });

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);  // Send back updated appointment data
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/appointments/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});
