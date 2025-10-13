import NavbarSchema from '../models/navbar.model.js'


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
    const { key } = req.params; // the item key to update
    const { label, icon, style } = req.body; // fields to update

    // Find the navbar document (assuming only one)
    const navbar = await NavbarSchema.findOne();
    if (!navbar) {
      return res.status(404).json({ message: "Navbar not found" });
    }

    // Find the index of the item to update
    const itemIndex = navbar.items.findIndex((item) => item.key === key);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Navbar item not found" });
    }

    // Update only provided fields
    if (label !== undefined) navbar.items[itemIndex].label = label;
    if (icon !== undefined) navbar.items[itemIndex].icon = icon;
    if (style !== undefined) navbar.items[itemIndex].style = style;

    // Save changes
    await navbar.save();

    res.status(200).json({
      message: "Navbar item updated successfully",
      item: navbar.items[itemIndex],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete a navbar item

//delete complete navbar