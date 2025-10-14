import mongoose from "mongoose";
import MediaItemSchema from './media.item.model.js'

const MediaCollectionSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        media:{
            type: [MediaItemSchema],
            required: true
        },
        type:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default MediaCollectionSchema;