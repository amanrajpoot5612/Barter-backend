import e from "express";
import upload from "../middlewares/multer.middleware.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { uploadImage, uploadMultipleImages, deleteImage, testImage, getImages } from "../controllers/barter.controller.js";

const uploadRouter = e.Router();

uploadRouter.post("/image", uploadImage)

uploadRouter.post("/image-multiple", upload.array("files", 50), uploadMultipleImages);

uploadRouter.delete("/image/:publicId", deleteImage);

uploadRouter.get('/image-page', getImages)

uploadRouter.get("/test", testImage);


export default uploadRouter;
