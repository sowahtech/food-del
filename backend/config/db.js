import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://justicesowah18:complete092024@cluster0.0wkwf.mongodb.net/oregano-food-del-app"
    )
    .then(() => console.log("connected to DB successfully"));
};
