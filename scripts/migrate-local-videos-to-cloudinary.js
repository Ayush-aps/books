/**
 * One-off migration script to push existing locally stored videos
 * in public/uploads/videos to Cloudinary and update BookVideo docs.
 *
 * Usage (after setting env vars):
 *   node scripts/migrate-local-videos-to-cloudinary.js
 */
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const BookVideo = require('../models/BookVideo');

async function main() {
  if (!cloudinary.config().cloud_name) {
    console.error('Cloudinary not configured. Exiting.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const baseDir = path.join(__dirname, '..', 'public', 'uploads', 'videos');
  if (!fs.existsSync(baseDir)) {
    console.log('No local videos directory found. Nothing to migrate.');
    return process.exit(0);
  }

  const videos = await BookVideo.find({ cloudinaryPublicId: { $exists: false }, videoUrl: /\/uploads\/videos\// });
  console.log(`Found ${videos.length} video(s) to migrate.`);

  for (const video of videos) {
    try {
      const localPath = path.join(__dirname, '..', 'public', video.videoUrl.replace(/^\//, ''));
      if (!fs.existsSync(localPath)) {
        console.warn('File missing, skipping', localPath);
        continue;
      }
      const buffer = fs.readFileSync(localPath);
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
          resource_type: 'video',
          folder: 'bookish/videos/migrated'
        }, (err, res) => err ? reject(err) : resolve(res));
        streamifier.createReadStream(buffer).pipe(stream);
      });
      video.videoUrl = uploadResult.secure_url;
      video.cloudinaryPublicId = uploadResult.public_id;
      if (!video.duration && uploadResult.duration) video.duration = Math.round(uploadResult.duration);
      await video.save();
      console.log('Migrated', video._id.toString(), '=>', uploadResult.public_id);
    } catch (e) {
      console.error('Failed to migrate video', video._id.toString(), e);
    }
  }

  console.log('Migration complete. Optionally remove local files after verifying.');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });