import { Request, Response } from "express"
import fs from "fs"
import { COMPRESSED_DIR } from "../constants";
import createZipFile from "../lib/compress/createZipFile";
import processCompressionBatch from "../lib/processCompressionBatch";
import path from "path";
import getPayload from "../lib/getPayload";
import { AppError } from "../lib/error"

const compressImages = async (req: Request, res: Response) => {
  const { imageFiles, config } = getPayload(req);
  let urlFilePaths: string[] = [];

  try {
    const results = await processCompressionBatch(imageFiles, config);
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

    urlFilePaths.forEach(url => {
      const filePath = path.join(COMPRESSED_DIR, path.basename(url));
      fs.unlink(filePath, (err) => { if (err) console.error(err); });
    });

    if (error instanceof AppError) {
      res.status(error.status).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message || 'Gagal mengompresi beberapa gambar.' });
  }
}

export { compressImages }
