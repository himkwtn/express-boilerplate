import mongoose from "mongoose";

export function initializeDatabase() {
  mongoose
    .connect(
      process.env.MONGODB_URI as string,
      { useNewUrlParser: true }
    )
    .then(() => console.log("db connected"))
    .catch(console.log);
}
