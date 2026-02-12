// import mongoose from "mongoose";

// export const connectDB = async () => {
//   await mongoose
//     .connect(
//       "mongodb+srv://justicesowah18:complete092024@cluster0.0wkwf.mongodb.net/oregano-food-del-app"
//     )
//     .then(() => console.log("connected to DB successfully"));
// };
// backend/config/db.js

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};


