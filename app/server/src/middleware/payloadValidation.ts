import { Request, Response, NextFunction } from "express";
import fs from "fs"
import configValidation from "../validations/configValidation";
import getPayload from "../lib/getPayload";
import { MAX_TOTAL_UPLOAD_SIZE_BYTES } from "../constants";
import { AppError } from "../lib/error";

const payloadValidation = async (req: Request, _: Response, next: NextFunction) => {
  const { imageFiles, config } = getPayload(req);
  try {
    await configValidation(config);

    const totalUploadedSize = imageFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalUploadedSize > MAX_TOTAL_UPLOAD_SIZE_BYTES) {
      imageFiles.forEach((file: any) => fs.unlink(file.path, (err) => { if (err) console.error(err); }));
      throw new AppError("Total ukuran gambar melebihi batas", 413);
    }

    next();
  } catch (error) {
    throw error
  }
}

export default payloadValidation;
