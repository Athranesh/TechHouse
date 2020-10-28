import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //req.headers.authorization is structured as: "Bearer tokencode". Code below extracts the token itself.
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //The code below selects everything from the model except for the password.
      req.user = await UserModel.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);

      res.status(401);
      throw new Error('Not authorized, token failed.');
    }
  }

  if (!token) {
    res.status(401);

    throw new Error('Not authorized, token not found');
  }
});

export { protect };
