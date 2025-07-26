const isValidImageFileType = (file: File): boolean => {
  if (!file || !file.type) {
    return false; // File tidak ada atau tidak memiliki tipe MIME
  }

  const acceptedTypes = ['image/jpeg', 'image/png'];
  return acceptedTypes.includes(file.type.toLowerCase());
};


export default isValidImageFileType;
