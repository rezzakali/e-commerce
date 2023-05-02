import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_CONN_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `Database connected successfully to ${conn.connection.host}`.bgBlue
    );
  } catch (err) {
    console.log(`Connection failed!,${err}`.bgRed);
  }
};

export default connectDb;
