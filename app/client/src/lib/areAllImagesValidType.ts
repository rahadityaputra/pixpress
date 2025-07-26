import isValidImageFileType from "./isValidImageFileType";

export const areAllImagesValidType = (files: File[] | FileList): boolean => {
  if (!files || files.length === 0) {
    return false; // Tidak ada file
  }

  // Mengubah FileList menjadi Array untuk kemudahan iterasi
  const filesArray = Array.from(files);

  return filesArray.every(file => isValidImageFileType(file));
};
