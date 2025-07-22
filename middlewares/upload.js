const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "expedientes",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }]
  }
});

const upload = multer({ storage });

module.exports = upload;