const getImageUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();


    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result); // Mengirim Data URL melalui Promise
      } else {
        reject(new Error("Failed to read file as Data URL."));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };


    reader.readAsDataURL(file);

});
};

export default getImageUrl;
