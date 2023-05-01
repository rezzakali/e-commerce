// external import
import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';

// internal import

// enable colors
colors.enable();

// config dotenv
dotenv.config();

// port
const PORT = process.env.PORT || 9000;
const HOST_NAME = process.env.HOST_NAME || '127.0.0.1';

// app object
const app = express();

// route
app.get('/', (req, res) => {
  res.json('hello');
});

// listening server
app.listen(PORT, HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${HOST_NAME}:${PORT}`
      .bgMagenta
  );
});
