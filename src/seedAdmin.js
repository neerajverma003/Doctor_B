import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/user.model.js';

export async function seedAdminUser() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is missing in your .env file.');
  }

  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || 'Admin';

  if (!email || !password) {
    throw new Error(
      'ADMIN_EMAIL and ADMIN_PASSWORD are required in your .env file to seed the admin account.'
    );
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
    console.log(' Connected to MongoDB Atlas');
  }

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    existingAdmin.name = name;
    existingAdmin.password = password; // pre-save hook in user.model.js hashes this
    await existingAdmin.save();
    console.log(` Admin account updated for: ${email}`);
    return existingAdmin;
  }

  const newAdmin = new User({
    name,
    email,
    password, // pre-save hook in user.model.js hashes this
    role: 'admin',
  });

  await newAdmin.save();
  console.log(` Admin account seeded successfully!`);
  console.log(`   Email: ${email}`);
  console.log(`   Role:  admin`);

  return newAdmin;
}

// If executed directly from command line (e.g. npm run seed:admin or node src/seedAdmin.js)
if (process.argv[1]?.endsWith('seedAdmin.js')) {
  seedAdminUser()
    .then(() => {
      console.log(' Admin seed complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error(' Failed to seed admin:', err.message);
      process.exit(1);
    });
}
