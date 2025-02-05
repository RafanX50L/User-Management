import fs from "fs";
import path from "path";
import multer from "multer";

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving file to:", uploadDir); 
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const newFileName = `${Date.now()}-${file.originalname}`;
    console.log("Generated filename:", newFileName); 
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

export default upload;
