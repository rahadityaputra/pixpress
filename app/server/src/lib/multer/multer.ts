import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express"
import { COMPRESSED_DIR, UPLOAD_DIR } from "../../constants";



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
    cb(null, true);
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

