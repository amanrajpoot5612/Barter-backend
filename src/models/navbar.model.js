import mongoose from "mongoose";
import NavbarItemSchema from './Navbar.item.model.js'

const NavbarSchema = new mongoose.Schema(
    {
        items: {
            type: [NavbarItemSchema],
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("NavbarSchema", NavbarSchema);