import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("db already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to database");
  } catch (error) {
    console.log("error", error);
    return;
  }
};

export default connectDb;
