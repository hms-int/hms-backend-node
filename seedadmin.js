const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/user'); 

const MONGO_URI = 'mongodb://127.0.0.1:27017/hospital-backend'; 

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(' Connected to MongoDB');

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists:', existingAdmin.email);
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10); 

    const adminUser = new User({
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      name: 'Super Admin',
      phno: '9999999999',
      status: 'Active'
    });

    await adminUser.save();
    console.log('Admin user created successfully:', adminUser.email);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin user:', err);
    process.exit(1);
  }
}

seedAdmin();
