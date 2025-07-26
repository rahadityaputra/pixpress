import fs from "fs"
import archiver from "archiver"
import path from "path"
import { COMPRESSED_DIR } from "../../controllers/constants";

const createZipFile = (processedImageUrls: string[], outputZipPath: string) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    output.on('close', () => {
      console.log(`ZIP file created: ${archive.pointer()} total bytes`);
      console.log('Archiver has been finalized and the output file descriptor has closed.');
      resolve(outputZipPath); // Resolve Promise dengan path file ZIP
    });

    archive.on('error', (err: any) => {
      console.error('Archiver error:', err);
      if (fs.existsSync(outputZipPath)) {
        fs.unlink(outputZipPath, (unlinkErr) => {
          if (unlinkErr) console.error('Error removing partial ZIP file:', unlinkErr);
        });
      }
      reject(err);
    });

    archive.pipe(output);

    for (const url of processedImageUrls) {
      const fileName = path.basename(url); // Dapatkan nama file dari URL
      const filePath = path.join(COMPRESSED_DIR, fileName); // Path lokal di server
      if (fs.existsSync(filePath)) { // Pastikan file ada
        archive.file(filePath, { name: fileName });
      } else {
        console.warn(`File ${filePath} tidak ditemukan untuk dimasukkan ke ZIP.`);
      }
    }
    archive.finalize();
  });
};
export default createZipFile;

