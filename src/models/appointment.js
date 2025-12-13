const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient',                       
    required: true
  },
  dept: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department',                        
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Completed', 'Cancelled']
  },
  date: {
    type: Date,
    required: true
  },
  time: {   
    type: String, 
    required: true
  },
  rsv: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);