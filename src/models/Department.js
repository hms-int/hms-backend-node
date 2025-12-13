const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  dept: { 
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    trim: true     
  }
});

departmentSchema.statics.getAllDepartments = function() {
  return this.find().sort({ dept: 1 });
};

module.exports = mongoose.model("Department", departmentSchema);