const mongoose = require('mongoose');
const User = require('../src/models/User');
require('dotenv').config({ path: '.env' });

const viewUsers = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB...');

    const users = await User.find().sort({ createdAt: -1 });

    console.log('\n--- Registered Users ---');
    if (users.length === 0) {
      console.log('No users found yet.');
    } else {
      users.forEach(u => {
        console.log(`\nID: ${u._id}`);
        console.log(`Name: ${u.fullName}`);
        console.log(`Email: ${u.email}`);
        console.log(`Interests: ${u.adventureInterests.join(', ')}`);
        console.log(`Registered: ${u.createdAt}`);
      });
    }
    console.log('\n------------------------\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

viewUsers();
