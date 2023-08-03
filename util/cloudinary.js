const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
    cloud_name: 'ddivgpzbd', 
    api_key: '722385246674495', 
    api_secret: '30gfiXfzyFn6zXH3yC89-YRtUYg',
    // secure: true
  });

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'nodejs'
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;