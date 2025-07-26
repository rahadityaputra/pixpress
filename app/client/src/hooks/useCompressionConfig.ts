import { useState, useEffect, useCallback } from 'react';
import CompressConfig, { BaseCompressConfig } from '../types/CompressConfig';

const useCompressionConfig = () => {
  const [mode, setMode] = useState<'resize' | 'targetFileSize'>("resize");
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [quality, setQuality] = useState<number>(50);
  const [lossless, setLossless] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  const [size, setSize] = useState<number>(500);
  const [isCustomSize, setIsCustomSize] = useState<boolean>(true);

  useEffect(() => {
    if (format === 'png') {
      setLossless(true);
    } else {
      setLossless(false);
    }
  }, [format]);

  useEffect(() => {
    if (mode === "resize") {
      setIsCustomSize(false);
      setSize(500);
    } else {
      setWidth(100);
      setHeight(100);
    }
  }, [mode]);

  const getConfiguration = useCallback((): CompressConfig => {
    const baseConfig: BaseCompressConfig = {
      format,
      quality,
      lossless: format === 'png' ? true : false,
    };

    if (mode === "resize") {
      if (typeof width !== "number" || typeof height !== "number" || width <= 0 || height <= 0) {
        throw new Error("Width and height must be valid numbers for resize mode.");
      }
      return { ...baseConfig, mode: 'resize', width, height };
    } else {
      let finalSize = size;
      if (isCustomSize && (typeof size !== "number" || size <= 0)) {
        throw new Error("Custom target size must be a valid number for target file size mode.");
      }
      return { ...baseConfig, mode: 'targetFileSize', size: finalSize };
    }
  }, [mode, format, quality, lossless, width, height, size, isCustomSize]);


  return {
    mode, setMode,
    format, setFormat,
    quality, setQuality,
    lossless,
    width, setWidth,
    height, setHeight,
    size, setSize,
    isCustomSize, setIsCustomSize,
    getConfiguration,
  };
};

export default useCompressionConfig;
