const isTotalSizeExceeded = (files: File[] | FileList, maxTotalSizeMB: number): boolean => {
  if (!files || files.length === 0) {
    return false;
  }

  const filesArray = Array.from(files);
  const totalSizeInBytes = filesArray.reduce((sum, file) => sum + file.size, 0);
  const maxTotalSizeInBytes = maxTotalSizeMB * 1024 * 1024;
  return totalSizeInBytes > maxTotalSizeInBytes;

};

export default isTotalSizeExceeded;
