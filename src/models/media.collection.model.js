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
        altText:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)

export default MediaCollectionSchema;