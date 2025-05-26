import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../configs/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'users',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => file.fieldname + '-' + Date.now(),
  },
});

export const upload = multer({ storage }).single('picture');
