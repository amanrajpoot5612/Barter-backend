import { config } from "dotenv";

config()
const mongodbURI = process.env.MONGODB_URI;
export {mongodbURI};

const port = process.env.PORT || 4000;
export {port};

const cloudinary_name = process.env.CLOUDINARY_CLOUD_NAME
const cloudinary_api_key = process.env.CLOUDINARY_API_KEY
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET
export { cloudinary_name, cloudinary_api_key, cloudinary_api_secret};