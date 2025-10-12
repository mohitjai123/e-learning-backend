const {sequelize} = require('../config/squelize');
const Admin = require('./AdminModel');
const bcrypt = require('bcrypt');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync();

    const superAdminExists = await Admin.findOne({ where: { role: 'superadmin' } });
    if (!superAdminExists) {
      const hashedPassword = await bcrypt.hash('SuperAdmin@123', 10);
      await Admin.create({
        name: 'Super Admin',
        email: 'superadmin@learning.com',
        phone: '9999999999',
        password: hashedPassword,
        role: 'superadmin',
        access_type: 'all',
      });
      console.log('Default SuperAdmin created');
    } else {
      console.log('SuperAdmin already exists');
    }

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, Admin, connectDB };
