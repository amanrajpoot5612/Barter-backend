import NavbarSchema from '../models/navbar.model.js'
import mongoose from 'mongoose';



// get navbar route
export const getNavbar = async (req, res) => {
  try {
    console.log("Navbar controller called");
    const navbar = await NavbarSchema.findOne(); // assuming only 1 navbar document
    if (!navbar) {
      return res.status(404).json({ message: "Navbar not found" });
    }

    res.status(200).json(navbar.items); // return only the items array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// update complete navbar
export const postNavbar = async (req, res) => {
  try {
    // Check if navbar already exists
    const existingNavbar = await NavbarSchema.findOne();
    if (existingNavbar) {
      return res.status(400).json({ message: "Navbar already exists" });
    }

    // Create a new navbar document
    const { items } = req.body; // items = [{ name, key }, ...]
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Items array is required" });
    }

    const navbar = await NavbarSchema.create({ items });
    res.status(201).json(navbar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a single navbar item
export const updateNavbarItem = async (req, res) => {
  try {
    const { _id } = req.params; // this is the item's _id
    const { label, icon, key, style } = req.body;

    console.log("id", _id);
    console.log("label", label);
    console.log("key", key);

    const objectId = new mongoose.Types.ObjectId(_id);

    const navbar = await NavbarSchema.findOne({
      'items._id': objectId,
    });

    // console.log("navbar", navbar);

    if (!navbar) {
      return res.status(404).json({ message: 'Navbar not found' });
    }

    // Step 2: Use mongoose's subdocument accessor
    const item = navbar.items.id(objectId); // <-- Use same ObjectId here

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Step 3: Update only the provided fields
    if (label !== undefined) item.label = label;
    if (icon !== undefined) item.icon = icon;
    if (key !== undefined) item.key = key;
    if (style !== undefined) item.style = style;

    // Step 4: Save the parent document
    await navbar.save();

    res.status(200).json({
      message: 'Navbar item updated successfully',
      item,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// delete a navbar item

//delete complete navbar