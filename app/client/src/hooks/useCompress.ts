import ImageFile from "../types/ImageFile";
import { useState } from "react";
import CompressConfig from "../types/CompressConfig";

interface CompressedImageItem {
  id: number; // ID unik untuk setiap gambar, berguna untuk key React
  originalFileName: string; // Nama file asli
  beforeUrl: string; // URL gambar sebelum dikompresi (Data URL / Object URL)
  afterUrl: string; // URL gambar setelah dikompresi (URL dari server)
  originalSize: number; // Ukuran asli dalam bytes
  compressedSize: number; // Ukuran terkompresi dalam bytes
}


interface CompressedImageData {
  url: string,
  name: string,
  size: number
}

const useCompress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zipDownloadUrl, setZipDownloadUrl] = useState<string | null>(null);
  const [compressedImageItems, setCompressedImageItems] = useState<CompressedImageItem[]>([]);

  const createFormDataPayload = (config: CompressConfig | null, imageFiles: ImageFile[]): FormData => {
    const formData = new FormData();
    imageFiles.forEach((imageFile) => {
      formData.append(`images`, imageFile);
    });
    formData.append("config", JSON.stringify(config))
    return formData;
  }

  const compressImages = async (config: CompressConfig | null, imageFiles: ImageFile[]) => {
    const payloadData = createFormDataPayload(config, imageFiles);
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('http://localhost:3000/api/compress', {
        method: 'POST',
        body: payloadData
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json(); // Coba parse sebagai JSON
        } catch (jsonError) {
          errorData = { message: await response.text() || `Server responded with status: ${response.status}` };
        }
        throw new Error(errorData.message || `Server responded with status: ${response.status}`);
      }

      const result = await response.json();

      setZipDownloadUrl(result.urlZipDownload);

      const compressedImageData: CompressedImageData[] = result.compressedImageData;
      const x = combine(imageFiles, compressedImageData);
      console.log(x);
      setCompressedImageItems(x)
      console.log("Hasil kompresi dari server:", result);
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }

  }

  const clearError = () => {
    setError(null)
  }


  const combine = (notCompressedImageFiles: ImageFile[], compreeedImageData: CompressedImageData[]) => {
    const combineData: CompressedImageItem[] = notCompressedImageFiles.map((file, index) => {
      return {
        id: file.id,
        originalFileName: file.name,
        beforeUrl: file.imageUrl,
        afterUrl: compreeedImageData[index].url,
        originalSize: file.size,
        compressedSize: compreeedImageData[index].size
      }

    })
    return combineData;
  }

  const downloadCompressedImageFiles = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log(zipDownloadUrl);
      if (zipDownloadUrl) {
        window.open('http://' + zipDownloadUrl); // Buka URL ZIP di tab baru
      } else {
        throw new Error("URL ZIP tidak tersedia.");
      }
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { compressImages, loading, error, clearError, compressedImageItems, downloadCompressedImageFiles };
}

export default useCompress;
