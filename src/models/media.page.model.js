import mongoose from "mongoose";
import MediaCollectionSchema from './media.collection.model.js'

const MediaPageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        key: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        content:{
            type: [MediaCollectionSchema],
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("MediaPageSchema", MediaPageSchema)