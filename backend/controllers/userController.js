import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //If user is found and their password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Invalid user data');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
const getUserProfile = asyncHandler(async (req, res) => {
  //req.user is not sent by the client, it is added by "protect" middleware that finds the user based on token.

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      orders: user.orders,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }

  // res.send('success');
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (await user.matchPassword(req.body.password)) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.newPassword) {
        user.password = req.body.newPassword;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        orders: updatedUser.orders,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid password');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, updateUserProfile, registerUser };
