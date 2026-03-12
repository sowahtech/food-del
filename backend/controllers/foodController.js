import fs from "fs";
import foodModel from "./../models/foodModel.js";
import { uploader } from "../config/cloudinary.js";

// add food item

const addFood = async (req, res) => {
  try {
    // 1. If this doesn't log, the error is in your ROUTE/MULTER setup
    console.log("--- DEBUG START ---");
    console.log("Check Body:", req.body);
    console.log("Check File:", req.file ? req.file.path : "NULL");

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    // 2. Create the item (using the path Multer-Cloudinary already created)
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: req.file.path, 
    });

    await food.save();
    console.log("--- SAVE SUCCESS ---");
    return res.json({ success: true, message: "food added" });

  } catch (error) {
    // THIS WILL FORCE THE HIDDEN DATA OUT
    console.error("--- THE REAL ERROR IS BELOW ---");
    console.error("Name:", error.name);
    console.error("Msg:", error.message);
    console.error("Stack:", error.stack);
    
    return res.status(500).json({
      success: false,
      message: error.message,
      type: error.name
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
