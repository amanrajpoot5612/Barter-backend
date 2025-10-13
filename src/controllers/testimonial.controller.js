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
    const testimonialData = req.body;
    let testimonial = await TestimonialSchema.findOne();
    if (testimonial) {
      testimonial = await TestimonialSchema.findByIdAndUpdate(testimonial._id, testimonialData, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message: "Testimonial updated successfully",
        testimonial
      })
    }
    testimonial = new TestimonialSchema(testimonialData);
    await testimonial.save();

    res.status(200).json({
      message: "Testimonials created",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Testimonials couldn't be updated",
    });
  }
};
