import { Request, Response } from "express"
import fs from "fs"
import { COMPRESSED_DIR, MAX_TOTAL_UPLOAD_SIZE_BYTES } from "./constants";
import configValidation from "../validations/configValidation";
import createZipFile from "../lib/compress/createZipFile";
import processCompressionBatch from "./processCompressionBatch";
import MulterFile from "../types/MulterFile";
import path from "path";

const compressImages = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new Error("Upload File not found")

  }

  const uploadedFiles: MulterFile[] = req.files["images"];


  const configString = req.body.config;
  if (!uploadedFiles || uploadedFiles.length === 0) {
    return res.status(400).json({ success: false, message: 'Tidak ada file gambar yang diunggah.' });
  }

  let config: any;

  config = JSON.parse(configString);
  let urlFilePaths: string[] = [];

  try {
    await configValidation(config);

    const totalUploadedSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalUploadedSize > MAX_TOTAL_UPLOAD_SIZE_BYTES) {
      uploadedFiles.forEach((file: any) => fs.unlink(file.path, (err) => { if (err) console.error(err); }));
      return res.status(413).json({ success: false, message: `Total ukuran gambar melebihi batas ${MAX_TOTAL_UPLOAD_SIZE_BYTES / (1024 * 1024)} MB.` });
    }

    const results = await processCompressionBatch(uploadedFiles, config);

    urlFilePaths = results.map(file => {
      return file.url;
    })

    await createZipFile(urlFilePaths, COMPRESSED_DIR + "/result.zip")

    res.status(200).json({
      success: true,
      message: 'Images compressed successfully.',
      compressedImageData: results,
      urlZipDownload: 'localhost:3000/api/compressed_images/result.zip'
    });

  } catch (error: any) {
    console.log(error);
    urlFilePaths.forEach(url => {
      const filePath = path.join(COMPRESSED_DIR, path.basename(url));
      fs.unlink(filePath, (err) => { if (err) console.error(err); });
    });
    res.status(500).json({ success: false, message: error.message || 'Gagal mengompresi beberapa gambar.' });
  }
}

export { compressImages }
