import mongoose from 'mongoose';

const DEFAULT_MONGODB_URI = 'mongodb://127.0.0.1:27017/octofit_db';

export const getMongoUri = (): string => process.env.MONGODB_URI ?? DEFAULT_MONGODB_URI;

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = getMongoUri();
  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB at ${mongoUri}`);
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};

