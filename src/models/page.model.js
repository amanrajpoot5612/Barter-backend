import mongoose, { Schema } from "mongoose";

const PageDescriptionSchema = new mongoose.Schema(
  {
    paragraphs: {
      type: [String],
    },
    list: [
      {
        title: {
          type: String,
        },
        items: [
          {
            type: String,
          },
        ],
      },
    ],
    carouselImages: { type: [String] },
    buttons: {
    type :[String]
  },
  imageURL: {
    type: [String],
    required: false,
   }
},
  {
    timestamps: true,
  }
);

const PageSectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "imageCardGallery", "home"],
      reqiured: true,
    },
    preSubHeading: {
      type: String,
    },
    heading: {
      type: String,
      required: true,
    },
    subHeading: {
      type: String,
    },
    description: {
      type: PageDescriptionSchema,
    },
    // imageCardGallery: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "MediaSchema",
    //     },
    //   ],
    //   heading: {
    //     type: String,
    //     required: function () {
    //       return this.type === "imageCardGallery";
    //     },
    //   },
    //   type: {
    //     type: String,
    //     enum: ["card", "list"],
    //     required: function () {
    //       return this.type === "imageCardGallery";
    //     },
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

//{ runValidators: true, context: 'query' }

const PageSchema = new mongoose.Schema(
  {
    serialNumber: {
      unique: true,
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    section: {
      type: PageSectionSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Page = mongoose.model("PageSchema", PageSchema);

export default Page;
