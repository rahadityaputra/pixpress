import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express"
import { COMPRESSED_DIR } from "../../controllers/constants";


const UPLOAD_DIR = path.join(__dirname, "uploads_temp");

const storage = multer.diskStorage({
  destination: function(_, __, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function(_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (_: Request, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Terima file
  } else {
    cb(new Error("Hanya file JPEG dan PNG yang diizinkan!"), false); // Tolak file
  }
};

const checkUploadDir = () => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }

  if (!fs.existsSync(COMPRESSED_DIR)) {
    fs.mkdirSync(COMPRESSED_DIR);
  }
}

export {
  storage,
  checkUploadDir,
  fileFilter
}

