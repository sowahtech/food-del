import fs from "fs";
import foodModel from "./../models/foodModel.js";
import { uploader } from "../config/cloudinary.js";

// add food item

const addFood = async (req, res) => {
  // 1. LOG THE INCOMING DATA IMMEDIATELY
  console.log("--- NEW REQUEST ---");
  console.log("Body:", JSON.stringify(req.body));
  console.log("File:", req.file ? "File Received: " + req.file.path : "NO FILE RECEIVED");

  try {
    const result = await uploader.upload(req.file.path, {
      folder: "products", // Optional: organizes files in Cloudinary
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price), // Force number to avoid Mongoose type errors
      category: req.body.category,
      image: req.file.path,
    });

    await food.save();
    console.log("SUCCESS: Food saved to DB");
    return res.json({ success: true, message: "food added" });

  } catch (error) {
    console.error("--- DATABASE/SERVER ERROR ---");

    // This is the magic line that shows the ACTUAL error details in the terminal
    //console.dir(error, { depth: null });

    // OR use this if you prefer JSON format
    console.log("Full Error:", JSON.stringify(error, null, 2));

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};


// const addFood = async (req, res) => {
//   console.log("Body Data: " + JSON.stringify(req.body, null, 2));
//   console.log("File Data: " + JSON.stringify(req.file, null, 2));
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No image uploaded. Check your field name." });
//     }

//     let image_filename = req.file.path;

//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       image: image_filename,
//     });

//     await food.save();
//     res.json({ success: true, message: "food added" });
//   } catch (error) {
//     // This forces the object to show as readable text in Render logs
//     console.error("--- CRITICAL ERROR START ---");
//     console.error("Message:", error.message);
//     console.error("Full Object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     console.error("--- CRITICAL ERROR END ---");

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Unknown Server Error"
//     });
//   }
// };

// all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("List Food Error:", error.message, error.stack);
    res.json({ success: false, message: "error" });
  }
};

// remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => { });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.error("Remove Food Error:", error.message, error.stack);
    res.json({ success: false, message: "error" });
  }
};

export { addFood, listFood, removeFood };
