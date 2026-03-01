import fs from "fs";
import foodModel from "./../models/foodModel.js";

// add food item

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded. Check your field name." });
    }

    let image_filename = req.file.path;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "food added" });
  } catch (error) {
    console.error("Add Food Error:", error.message);
    // console.error(JSON.stringify(error, null, 2));
    // console.error("STACK:", error.stack);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

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
