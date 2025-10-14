import TestimonialSchema from "../models/testimonial.model.js";

export const getTestimonial = async (req, res) => {
  try {
    const testimonial = await TestimonialSchema.findOne();

    if (!testimonial) {
      return res.status(400).json({
        message: "No testimonial content found",
      });
    }
    return res.status(200).json(testimonial);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};



export const updateTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    const { img, heading, para } = req.body;

    const updated = await TestimonialSchema.findOneAndUpdate(
      { "items._id": testimonialId }, // find testimonial in items array
      {
        $set: {
          "items.$.img": img,
          "items.$.heading": heading,
          "items.$.para": para,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};
