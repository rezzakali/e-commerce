import fs from 'fs';
import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, answer, address } = req.fields;

    const { profile } = req.files;

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
    if (!profile) {
      res.status(400).send({ message: 'Profile is required!' });
    }
    if (profile && profile.size > 2000000) {
      res.status(400).send({
        message:
          'Product image is require and should be less than or equal to 2MB',
      });
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

    if (profile) {
      newUser.profile.data = fs.readFileSync(profile.path);
      newUser.profile.contentType = profile.type;
    }

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
        answer: user.answer,
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

// get user profile image

export const getUserProfileImageController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select('profile');
    if (user.profile.data) {
      res.set('Content-type', user.profile.contentType);
      return res.status(200).send(user.profile.data);
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!' || err?.message,
      error: err,
    });
  }
};

// update user information
export const updateUserInformationController = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateName, updateEmail, updateAddress, updateAnswer } = req.body;

    if (!updateName || !updateEmail || !updateAddress || !updateAnswer) {
      res.status(400).send({
        success: false,
        message: 'Every field must be reqired!',
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        name: updateName,
        email: updateEmail,
        address: updateAddress,
        answer: updateAnswer,
      },
      { new: true }
    );

    // generate token
    const token = JWT.sign({ _id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).send({
      success: true,
      message: 'User udpated successfully!',
      user: updatedUser,
      token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!' || err?.message,
      error: err,
    });
  }
};

// update user profile picture controller
export const updateUserProfilePictureController = async (req, res) => {
  try {
    const { id } = req.params;
    const { profilePicture } = req.files;

    if (profilePicture && profilePicture.size > 2000000) {
      return res.status(400).send({
        message:
          'Product image is require and should be less than or equal to 2MB',
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        profile: {
          data: fs.readFileSync(profilePicture.path),
          contentType: profilePicture.type,
        },
      },
      { new: true }
    );

    // generate token
    const token = JWT.sign({ _id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).send({
      success: true,
      message: 'Profile picture changed!',
      user: updatedUser,
      token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!' || err?.message,
      error: err,
    });
  }
};

// testing
export const testController = (req, res) => {
  res.send('Prottected rotue');
};
