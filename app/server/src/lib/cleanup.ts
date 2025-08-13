import path from "path";
import fs from "fs";


const cleanUp = (directoryPath: string, maxAgeInHours: number) => {
  const cutoffTime = Date.now() - (maxAgeInHours * 60 * 60 * 1000);

  if (!fs.existsSync(directoryPath)) {
    console.warn(`Direktori tidak ada: ${directoryPath}`);
    return;
  }

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Gagal membaca direktori: ${directoryPath}`, err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error(`Gagal mendapatkan info file: ${filePath}`, statErr);
          return;
        }

        if (stats.mtimeMs < cutoffTime) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(`Gagal menghapus file lama: ${filePath}`, unlinkErr);
            } else {
              console.log(`Menghapus file lama: ${filePath}`);
            }
          });
        }
      });
    });
  });
};

export default cleanUp;
