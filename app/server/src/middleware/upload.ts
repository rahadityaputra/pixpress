import multer from "multer";
import { checkUploadDir, fileFilter, storage } from "../lib/multer/multer";
import { Request, Response, NextFunction } from "express";

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});


const uploadSetup = (_: Request, __: Response, next: NextFunction) => {
  checkUploadDir();
  next();
}


const getUploadPayload = () => {
  return upload.fields([{ name: "config" }, { name: "images" }])
};

export {
  getUploadPayload,
  uploadSetup
}

