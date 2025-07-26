import { useState } from "react";
import ImageFile from "../types/ImageFile";
import getImageUrl from "../lib/getUrlImage";
import isTotalSizeExceeded from "../lib/isTotalSizeExceeded";

const useUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState<number>(0);
  const [imageFiles, setImagesFiles] = useState<ImageFile[]>([])
  const MAX_UPLOAD_SIZE_MB = 20

  const resetId = () => {
    setLastId(0)
  }

  const uploadImageFiles = async (newImageFiles: FileList) => {

    try {
      setLoading(true)
      setError(null)

      const filesArray = Array.from(newImageFiles);

      const ImageUrls = await Promise.all(filesArray.map(file => {
        return getImageUrl(file);
      }))

      console.log(ImageUrls);

      setImagesFiles(prevImageFiles => {
        let counterUrl = 0;
        let currentIdCounter = lastId;
        const newImageFilesFormated: ImageFile[] = filesArray.map(file => {
          currentIdCounter++;
          const newInstanceFile = new File([file], file.name, { type: file.type, lastModified: file.lastModified });
          const newImageFileFormated: ImageFile = Object.assign(newInstanceFile, { id: currentIdCounter, imageUrl: ImageUrls[counterUrl] });
          counterUrl++;
          return newImageFileFormated;
        })

        setLastId(currentIdCounter)
        const combinedFilesForValidation = [...prevImageFiles, ...newImageFilesFormated];
        if (isTotalSizeExceeded(combinedFilesForValidation, MAX_UPLOAD_SIZE_MB)) {
          throw new Error(`Total ukuran gambar melebihi batas maksimum ${MAX_UPLOAD_SIZE_MB} MB.`);
        }
        return [...prevImageFiles, ...newImageFilesFormated]
      })

    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const removeAllImageFiles = () => {
    setImagesFiles([]);
    resetId();
  }

  const removeImageFiles = (id: number) => {
    const imageFilesAfterEdit = imageFiles.filter((imageFile) => {
      return imageFile.id != id
    })
    setImagesFiles(imageFilesAfterEdit)
  }

  return { uploadImageFiles, removeAllImageFiles, removeImageFiles, imageFiles, loading, error };
}

export default useUpload;
