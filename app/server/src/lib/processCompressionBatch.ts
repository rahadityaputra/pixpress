import path from "path";
import fs from "fs";
import compressByTargetSize from "../lib/compressByTargetFile";
import compressByResize from "../lib/compressByResize";

interface CompressionOutputInfo {
  format: string;
  size: number;
  width: number;
  height: number;
  channels: number;
  premultiplied: boolean;
}

interface CompressedImageResult {
  size: number;
  url: string;
  name: string;
}

interface CompressionConfig {
  mode: 'resize' | 'targetFileSize';
  format: 'jpeg' | 'png';
  quality?: number;
  width?: number;
  height?: number;
  size?: number;
}

import { COMPRESSED_DIR } from "../constants";
import sharp from "sharp";
import MulterFile from "../types/MulterFile";

const processCompressionBatch = async (
  fileImages: MulterFile[],
  config: CompressionConfig
): Promise<CompressedImageResult[]> => {

  const promises = fileImages.map(async (file: MulterFile) => {
    const originalFilePath = file.path;

    const outputExtension = config.format === 'jpeg' ? 'jpg' : 'png';
    const compressedFileName = `compressed-${path.parse(file.filename).name}-${Date.now()}.${outputExtension}`;
    const compressedFilePath = path.join(COMPRESSED_DIR, compressedFileName);
    let sharpOutputInfo: CompressionOutputInfo;

    try {
      if (config.mode === 'resize' && typeof config.width === 'number' && typeof config.height === 'number' && typeof config.quality === 'number') {
        sharpOutputInfo = await compressByResize(
          originalFilePath,
          compressedFilePath,
          config.width,
          config.height,
          config.quality,
          config.format
        );
      } else if (config.mode === "targetFileSize" && typeof config.size === 'number') {
        if (config.format === 'jpeg') {
          sharpOutputInfo = await compressByTargetSize(
            originalFilePath,
            compressedFilePath,
            config.size,
            config.format
          );
        } else {
          console.warn(`Target file size compression by quality is not precisely supported for PNG. Applying max lossless compression for ${file.originalname}.`);
          const tempImage = sharp(originalFilePath);
          sharpOutputInfo = await tempImage.png({ compressionLevel: 9, progressive: true }).toFile(compressedFilePath);
        }
      } else {
        throw new Error(`Invalid compression mode or missing parameters for ${file.originalname}.`);
      }

      fs.unlink(originalFilePath, (err) => {
        if (err) console.error(`Failed to delete temporary file ${originalFilePath}:`, err);
      });

      const publicUrl = `/compressed_images/${compressedFileName}`;

      const resultData: CompressedImageResult = {
        size: sharpOutputInfo.size,
        url: publicUrl,
        name: compressedFileName
      };
      return resultData;
    } catch (compressionError: any) {
      if (fs.existsSync(compressedFilePath)) {
        fs.unlink(compressedFilePath, (unlinkErr) => {
          if (unlinkErr) console.error(`Failed to delete partially created compressed file ${compressedFilePath}:`, unlinkErr);
        });
      }
      throw new Error(`Failed to compress ${file.originalname}: ${compressionError.message || compressionError}`);
    }
  });

  const results = await Promise.all(promises);
  return results;
};

export default processCompressionBatch;
