import mongoose from "mongoose";

const NavbarItemSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true
        },
        key:{
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        link:{
            type: String,
            // requred: true
        },
        icon: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

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