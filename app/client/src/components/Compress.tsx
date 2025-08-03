import { useCallback, useState } from "react";
import ImageUploadBox from "./ImageUploadBox";
import ConfigurationBox from "./ConfigurationBox";
import ImageFile from "../types/ImageFile";
import CompressConfig from "../types/CompressConfig";
import useCompress from "../hooks/useCompress";
import CompressionResultBox from "./CompressionResultBox";
import StatusDialog from "./StatusDialog";

const Compress = () => {
  const [currentGlobalConfig, setCurrentGlobalConfig] = useState<CompressConfig | null>(null);
  const [currentImageFiles, setCurrentImageFiles] = useState<ImageFile[]>([]);
  const { compressImages, loading, error, clearError, compressedImageItems, downloadCompressedImageFiles
  } = useCompress();

  const handleCurrentGlboalConfigUpdate = useCallback((config: any) => {
    setCurrentGlobalConfig(config)
  }, [])

  const handleCurrentImageFilesUpdate = useCallback((imageFiles: ImageFile[]) => {
    setCurrentImageFiles(imageFiles)
  }, [])

  const handleCompressImage = async () => {
    console.log(currentImageFiles);
    console.log(currentGlobalConfig);
    await compressImages(currentGlobalConfig, currentImageFiles)
  };

  const handleDownloadZip = async () => {
    await downloadCompressedImageFiles()
  }

  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row h-[500px] gap-2 p-3">
        <ConfigurationBox handleConfiguration={handleCurrentGlboalConfigUpdate} />
        <ImageUploadBox handleImageFilesUpload={handleCurrentImageFilesUpdate} onCompressImage={handleCompressImage} />
        <CompressionResultBox loading={loading} results={compressedImageItems} onDownloadZip={handleDownloadZip} />
      </div>

      <StatusDialog onClose={clearError} header={"Error"} isOpen={error != null} type="error" text={error} />
    </div >
  );
};

export default Compress;
