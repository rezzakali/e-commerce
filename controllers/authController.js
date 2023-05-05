import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address, answer } = req.body.data;

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
      res.status(400).send({ message: 'Address is required!' });
    }
    if (!answer) {
      res.status(400).send({ message: 'Answer is required!' });
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
      answer,
    });

    await newUser.save();
    res.status(201).send({
      success: true,
      message: 'User registered successfully!',
      user: newUser,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: 'There was a server side error!', success: false });
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body.data;

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
    res
      .status(500)
      .send({ message: 'There was a server side error!', success: false });
  }
};

// forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body.data;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: 'Email is required!',
      });
    }
    if (!answer) {
      return res.status(400).send({
        success: false,
        message: 'Answer is required!',
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: 'New password is required!',
      });
    }
    // check user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: `User doesn't exists!` });
    }
    // hash new password
    const hashNewPassword = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashNewPassword });

    res
      .status(200)
      .send({ success: true, message: 'Password reset successfully!' });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message,
      error: err,
    });
  }
};

// get all users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({ role: 'user' });
    res.status(200).send({
      success: true,
      message: 'User fetched successfully!',
      users,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message,
      error: err,
    });
  }
};

// delete user
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: 'User deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err?.message,
      error: err,
    });
  }
};

// testing
export const testController = (req, res) => {
  res.send('Prottected rotue');
};
