import mongoose from "mongoose";

const FooterSectionItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        link: {
            type: String
        },
        icon:{
            type: String
        },
    },
    {
        timestamps: true
    }
)


const FooterSectionSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
        },
        type:{
            type: String,
            enum: ["links", "contact", "social"],
            required: true
        },
        items: [FooterSectionItemSchema],
    },
    {
        timestamps: true
    }
)

const FooterSchema = new mongoose.Schema(
    {
        logo: {
            type: String,
            required: true
        },
        companyName:{
            type: String,
            required: true
        },
        sections: [FooterSectionSchema],
        bottom: {
            left: {
                type: String
            },
            right:{
                type: String
            }
        }
    },
    {
        timestamps: true
    }
)


const Footer = mongoose.model("Footer", FooterSchema)

export default Footer