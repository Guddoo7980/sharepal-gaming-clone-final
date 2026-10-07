import mongoose from 'mongoose';

let connectPromise;

export async function connectDB() {
  if (!process.env.MONGODB_URI) return false;
  if (mongoose.connection.readyState === 1) return true;
  if (!connectPromise) {
    connectPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    }).then(() => true).catch((error) => {
      console.warn('MongoDB connection failed. JSON fallback remains active:', error.message);
      connectPromise = null;
      return false;
    });
  }
  return connectPromise;
}
