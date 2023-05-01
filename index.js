// external import
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

// internal import
import connectDb from './config/db.js';

// config dotenv
dotenv.config();

// enable colors
colors.enable();

// db connection
connectDb();

// port
const PORT = process.env.PORT || 9000;
// host
const HOST_NAME = process.env.HOST_NAME || '127.0.0.1';

// app object
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// route
app.get('/', (req, res) => {
  res.json('hello world');
});

// listening server
app.listen(PORT, HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${HOST_NAME}:${PORT}`
      .bgMagenta
  );
});
