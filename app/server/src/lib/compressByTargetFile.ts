import sharp from 'sharp';
import * as fs from 'fs';
import SharpOutputInfo from '../types/SharpOutputInfo';

const compressByTargetSize = async (
  inputFilePath: string,
  outputFilePath: string,
  targetSizeKB: number,
  outputFormat: 'jpeg' | 'png',
): Promise<SharpOutputInfo> => {
  const minQuality = 1
  const maxQuality = 100
  const maxIterations = 50

  const targetSizeInBytes = targetSizeKB * 1024;

  let currentMinQuality = minQuality;
  let currentMaxQuality = maxQuality;
  let bestQuality = 75;
  let bestSize = Infinity;
  let iterations = 0;

  const originalImageBuffer = await fs.promises.readFile(inputFilePath);

  const metadata = await sharp(originalImageBuffer).metadata();
  if (metadata.format !== 'jpeg') {
    throw new Error(`Target file size compression by quality is only reliable for JPEG images. Detected: ${metadata.format}`);
  }

  while (iterations < maxIterations) {
    const currentQuality = Math.round((currentMinQuality + currentMaxQuality) / 2);

    if (currentMinQuality > currentMaxQuality || currentQuality === bestQuality && iterations > 0) {
      break;
    }

    try {
      const tempBuffer = await sharp(originalImageBuffer)
        .jpeg({ quality: currentQuality, progressive: true })
        .toBuffer();

      const currentSize = tempBuffer.length;

      if (currentSize <= targetSizeInBytes) {
        bestQuality = currentQuality;
        bestSize = currentSize;
        currentMinQuality = currentQuality + 1;
      } else {
        currentMaxQuality = currentQuality - 1;
      }

      if (Math.abs(currentSize - targetSizeInBytes) < targetSizeInBytes * 0.01) { // 1% tolerance
        bestQuality = currentQuality;
        bestSize = currentSize;
        break;
      }

    } catch (iterError: any) {
      console.warn(`Sharp iteration error with quality ${currentQuality} for ${inputFilePath}:`, iterError.message);
      currentMaxQuality = currentQuality - 1; // Try lower quality
      if (currentMaxQuality < minQuality) currentMaxQuality = minQuality; // Don't go below min
    }
    iterations++;
  }

  try {
    const image = sharp(originalImageBuffer)

    let formatedImage;
    if (outputFormat === "jpeg") {
      formatedImage = image.jpeg({ quality: bestQuality, progressive: true })
    } else {
      const pngEffort = Math.min(9, Math.round(bestQuality / 10));
      formatedImage = image.png({ compressionLevel: pngEffort, progressive: true, quality: bestQuality });
    }

    const compressedImage = formatedImage.toFile(outputFilePath);

    // const finalStats = await fs.promises.stat(outputFilePath);
    // if (finalStats.size > targetSizeInBytes * 1.1) { // If final size is still more than 10% over target
    //   console.warn(`Warning: Final compressed size (${finalStats.size} bytes) for ${outputFilePath} is still significantly above target (${targetSizeInBytes} bytes) with best quality ${bestQuality}.`);
    //   throw new Error("error ")
    // }
    return compressedImage;
  } catch (finalCompressError: any) {
    throw new Error(`Failed to perform final compression to target size: ${finalCompressError.message}`);
  }
};

export default compressByTargetSize;
