import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// protect route based on token
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).send({
      message: err?.message,
      success: false,
    });
  }
};

// is admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized Access!',
      });
    }
    next();
  } catch (err) {
    res.status(401).send({
      success: false,
      message: err?.message,
      error: err,
    });
  }
};
