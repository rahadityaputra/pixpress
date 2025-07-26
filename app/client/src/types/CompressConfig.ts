export interface BaseCompressConfig {
  format: 'jpeg' | 'png';
  quality: number; // 1-100
  lossless: boolean;
}

interface ResizeModeConfig extends BaseCompressConfig {
  mode: 'resize';
  width: number;
  height: number;
}

interface TargetFileSizeModeConfig extends BaseCompressConfig {
  mode: 'targetFileSize';
  size: number;
}

type CompressConfig = ResizeModeConfig | TargetFileSizeModeConfig;

export default CompressConfig

