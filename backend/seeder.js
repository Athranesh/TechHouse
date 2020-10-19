import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //Clears models
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers.find((user) => user.isAdmin);

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green);

    process.exit();
  } catch (error) {
    console.log(`${error}`.red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //Clears models
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red);

    process.exit();
  } catch (error) {
    console.log(`${error}`.red);
    process.exit(1);
  }
};

//process.argv[2] is the option passed in the terminal
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
