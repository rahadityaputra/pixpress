import { Request } from "express";
import MulterFile from "../types/MulterFile";

const getPayload = (req: Request) => {
  if (!req.files) {
    throw new AppError("Upload File not found", 400)
  }
  const files = req.files;
  console.log(typeof files);

  const uploadedFiles: MulterFile[] = req.files["images"];
  const configString = req.body.config;
  if (!uploadedFiles || uploadedFiles.length === 0) {
    throw new AppError("Tidak ada file gambar yang diunggah", 400);
  }
  let config: any = JSON.parse(configString);
  return {
    imageFiles: uploadedFiles,
    config: config
  }
}

export default getPayload;
