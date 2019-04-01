import mongoose from 'mongoose';

export function initializeDatabase() {
  console.log('initializing database... ');
  mongoose
    .connect(
      process.env.MONGODB_URI as string,
      { useNewUrlParser: true }
    )
    .then(() => console.log('db connected'))
    .catch(console.log);
}
