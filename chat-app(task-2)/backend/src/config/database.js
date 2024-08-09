import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "ChatApp"
    });
    console.log('Connected to MongoDB ChatApp');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};