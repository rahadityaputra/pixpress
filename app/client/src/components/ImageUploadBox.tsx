import ImageElement from "./Image.jsx";
import { Button, Flex } from "@radix-ui/themes";
import ImageFile from "../types/ImageFile.js";
import { ChangeEventHandler, DragEventHandler, useEffect } from "react";
import useUpload from "../hooks/useUpload.js";
import { areAllImagesValidType } from "../lib/areAllImagesValidType.js";

type ImageUploadBoxProps = {
  handleImageFilesUpload: (imageFiles: ImageFile[]) => void,
  onCompressImage: () => void
}
const ImageUploadBox = ({ handleImageFilesUpload, onCompressImage }: ImageUploadBoxProps) => {
  const { loading, error, imageFiles, uploadImageFiles, removeAllImageFiles, removeImageFiles } = useUpload();

  useEffect(() => {
    handleImageFilesUpload(imageFiles);
  }, [imageFiles])

  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();
  };

  const handleDropImageFiles: DragEventHandler = (event) => {
    event.preventDefault();
    const newImageFiles = event.dataTransfer.files;
    if (areAllImagesValidType(newImageFiles)) {
      uploadImageFiles(newImageFiles);
    }
  };

  const handleChangeInputFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newImageFiles = (event.target as HTMLInputElement)?.files;
    if (newImageFiles && newImageFiles?.length > 0) {
      uploadImageFiles(newImageFiles);
    }
  };

  const handleRemoveImage = (id: number) => {
    removeImageFiles(id)
  };

  const handleRemoveALlImage = () => {
    removeAllImageFiles();
  };


  const handleCompressImage = () => {
    onCompressImage();
    handleRemoveALlImage();
  }

  return (
    <Flex
      direction={"column"}
      onDrop={handleDropImageFiles}
      onDragOver={handleDragOver}
      className="w-[500px] min-h-[400px] font-roboto gap-2 p-5 shadow-md rounded-md bg-white border border-s-green-50"
    >
      <Flex id="files-upload" gap="2">
        <Button variant="solid">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8543 11.9741L16.2686 10.5599L12.0259 6.31724L7.78327 10.5599L9.19749 11.9741L11.0259 10.1457V17.6828H13.0259V10.1457L14.8543 11.9741Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5C2.79086 1 1 2.79086 1 5V19ZM5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
              fill="currentColor"
            />
          </svg>
          Upload Images
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute opacity-0"
            onChange={handleChangeInputFile}
          ></input>
        </Button>
        <Button variant="surface" onClick={handleRemoveALlImage}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z"
              fill="currentColor"
            />
          </svg>
          Hapus Semua Berkas
        </Button>

      </Flex>

      <Flex
        id="image-drop-zone"
        className="h-full font-bold text-lg relative w-full overflow-y-scroll"
      >


        {imageFiles.length == 0 && (
          <div
            id="empty-images"
            className="rounded-2xl border-2 border-blue-400 border-dashed h-full w-full flex justify-center items-center"
          >
            <span className="text-blue-600 opacity-25">
              Drop Gambar Disini !
            </span>
          </div>
        )}
        {imageFiles.length > 0 && (
          <div
            id="images"
            className="w-full flex flex-wrap gap-3"
          >
            {imageFiles.map((imageFile: ImageFile) => {
              return (
                <ImageElement
                  key={imageFile.id}
                  imageFile={imageFile}
                  onRemoveImage={handleRemoveImage}
                />
              );
            })}
          </div>
        )}
      </Flex>

      <Button variant="solid" color="green" onClick={handleCompressImage} disabled={loading || imageFiles.length === 0}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z"
            fill="currentColor"
          />
        </svg>
        Kompress
      </Button>

    </Flex >
  );
};

export default ImageUploadBox;
