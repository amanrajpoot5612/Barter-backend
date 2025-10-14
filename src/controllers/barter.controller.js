import MediaPageSchema from "../models/media.page.model.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    console.log("image route called");
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {});
    res.status(200).json({
      success: true,
      url: result.secure_url, // Cloudinary URL
      public_id: result.public_id, // Correct publicId for deletion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "upload failed",
      error: error,
    });
  }
};
export { uploadImage };

const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const mediaItems = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      mediaItems.push({ url: result.secure_url });

      try {
        fs.unlinkSync(file.path);
      } catch (err) {
        console.warn("Temp file already deleted:", file.path);
      }
    }

    // 🧩 Extract title and key from request
    const pageTitle = req.body.pageTitle || null;
    const pageKey = req.body.pageKey || `untitled-page-${Date.now()}`;

    // 📦 Collection
    const mediaCollection = {
      title: req.body.title || "Untitled collection",
      media: mediaItems,
    };

    // 🔍 Check for existing page
    let existingPage = await MediaPageSchema.findOne({
      $or: [{ title: pageTitle }, { key: pageKey }],
    });

    if (existingPage) {
      existingPage.content.push(mediaCollection);
      await existingPage.save();

      return res.status(200).json({
        success: true,
        message: "Media collection added to existing page",
        data: existingPage,
      });
    } else {
      // 🆕 Create new page if not found
      const newMediaPage = new MediaPageSchema({
        title: pageTitle,
        key: pageKey,
        content: [mediaCollection],
      });

      await newMediaPage.save();

      return res.status(201).json({
        success: true,
        message: "Media page created successfully",
        data: newMediaPage,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

export { uploadMultipleImages };

const deleteImage = async (req, res) => {
  try {
    console.log("delete route called");

    const { publicId } = req.params;
    console.log(publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return res.status(200).json({ success: true, message: "File deleted" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "File not found or already deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
};
export { deleteImage };


const getImages = async (req, res) => {
    try {
        const images = await MediaPageSchema.find();
        console.log("images", images);
        res.status(200).json({
            page: images,
            message: "Page fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Pages can't be fetched"
        })
    }
}
export { getImages };

const testImage = async (req, res) => {
  try {
    // const images = await fetch(``)
  } catch (error) {}
};
export { testImage };
