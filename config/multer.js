const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "expedientes", // Carpeta específica
    allowed_formats: ["jpg", "png", "jpeg", "pdf"], // Incluí PDF si lo vas a usar
    transformation: [{ width: 1000, height: 1000, crop: "limit" }] // Opcional
  }
});

const upload = multer({ storage });

module.exports = upload;