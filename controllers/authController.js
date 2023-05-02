import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import ErrorResponse from '../utils/error.js';

// register controller
export const registerController = async (req, res) => {
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
  } catch (err) {
    console.log(err);
    return new ErrorResponse(err?.message, 400);
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email and password is provided or not
    if (!email) {
      return res.status(400).send({
        success: false,
        message: 'Provide your email!',
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: 'Provide your password!',
      });
    }

    // check user exists or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `User doesn't exists!`,
      });
    }

    // compare password
    const isValidPassword = await comparePassword(user.password, password);

    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        message: 'Password mismatched!',
      });
    }

    // generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // return response
    res.status(200).send({
      success: true,
      message: 'Logged in successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    return new ErrorResponse(err?.message, 500);
  }
};

// testing
export const testController = (req, res) => {
  res.send('Prottected rotue');
};
