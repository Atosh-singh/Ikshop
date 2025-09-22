const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define allowed file types
const allowedImageMimes = ['image/jpeg', 'image/png', 'image/jpg'];
const allowedVideoMimes = ['video/mp4', 'video/webm', 'video/avi'];
const allowedAudioMimes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

// Function to create multer storage configuration
const createStorage = (folderPath = 'public/uploads', fileTypes = allowedImageMimes) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      // Resolve the absolute path for the file upload directory
      const uploadPath = path.join(__dirname, `../../${folderPath}`);

      // Ensure the directory exists, create it if necessary
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      // Check if the file type is valid
      if (!fileTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type'), false);
      }

      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname; // Unique filename based on timestamp
      cb(null, name);
    }
  });
};

// File filters for images, videos, and audio
const fileFilter = (fileTypes) => (req, file, cb) => {
  if (fileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file format'), false); // Reject the file
  }
};

// Function to create the multer upload middleware
const uploadFile = (fileType = 'image', folderPath = 'public/uploads') => {
  let allowedTypes = [];
  switch (fileType) {
    case 'video':
      allowedTypes = allowedVideoMimes;
      break;
    case 'audio':
      allowedTypes = allowedAudioMimes;
      break;
    case 'image':
    default:
      allowedTypes = allowedImageMimes;
  }

  const storage = createStorage(folderPath, allowedTypes);
  return multer({ storage, fileFilter: fileFilter(allowedTypes) });
};

module.exports = uploadFile;
