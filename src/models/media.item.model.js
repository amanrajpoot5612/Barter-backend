import mongoose from "mongoose";


const MediaItemSchema = new mongoose.Schema(
    {
        url:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: false,
    }
)

export default MediaItemSchema;