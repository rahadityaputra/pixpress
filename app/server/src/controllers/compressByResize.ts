import sharp from 'sharp';
import * as fs from 'fs';
import SharpOutputInfo from '../types/SharpOutputInfo';

const compressByResize = async (
  inputFilePath: string,
  outputFilePath: string,
  width: number,
  height: number,
  quality: number,
  outputFormat: 'jpeg' | 'png'
): Promise<SharpOutputInfo> => {

  const originalImageBuffer = await fs.promises.readFile(inputFilePath);

  try {
    const resizedImage = sharp(originalImageBuffer)
      .resize(width, height)

    let formatedImage;
    if (outputFormat === "jpeg") {
      formatedImage = resizedImage.jpeg({ quality, progressive: true })
    } else {
      const pngEffort = Math.min(9, Math.round(quality / 10));
      formatedImage = resizedImage.png({ compressionLevel: pngEffort, progressive: true, quality });
    }

    const compressedImage = formatedImage.toFile(outputFilePath);
    return compressedImage;

  } catch (finalCompressError: any) {
    throw new Error(`Failed to perform final compression to resize: ${finalCompressError.message}`);
  }
};

export default compressByResize;
