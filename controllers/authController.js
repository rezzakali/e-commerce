import { hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import ErrorResponse from '../utils/error.js';

export const registerController = async (req, res, next) => {
  try {
    const { name, email, phone, password, address } = req.body;
    if (!name) {
      res.status(400).send({ message: 'Name is required!' });
    }
    if (!email) {
      res.status(400).send({ message: 'Email is required!' });
    }
    if (!phone) {
      res.status(400).send({ message: 'Phone no is required!' });
    }
    if (!password) {
      res.status(400).send({ message: 'Password is required!' });
    }
    if (!address) {
      res.status(400).send({ message: 'Password is required!' });
    }

    // check exist user
    const existsUser = await userModel.findOne({ email });

    // exists user
    if (existsUser) {
      res.status(403).send({
        success: false,
        message: 'User already exists!',
      });
    }

    // hashing password
    const hashedPassword = await hashPassword(password);

    // create user
    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    await newUser.save();
    res.status(201).send({
      success: true,
      message: 'User registered successfully!',
      user: newUser,
    });
    next();
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse(err?.message, 400));
  }
};
