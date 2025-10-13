import mongoose from "mongoose";

const TestimonialItemSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    para: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TestimonialSchema = new mongoose.Schema(
  {
    items: {
      type: [TestimonialItemSchema],
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Testimonial", TestimonialSchema)


