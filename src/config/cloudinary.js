import {v2 as cloudinary} from 'cloudinary';
import { cloudinary_name, cloudinary_api_key, cloudinary_api_secret} from '../config/conf.js'

cloudinary.config({
    cloud_name: cloudinary_name,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret
})

export default cloudinary;  