const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Prefer single CLOUDINARY_URL if provided; fallback to individual credentials.
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true });
} else if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
} else {
  console.warn('[cloudinary] No CLOUDINARY credentials found. Video upload will fail until set.');
}

module.exports = cloudinary;