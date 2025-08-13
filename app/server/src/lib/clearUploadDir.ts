import fs from "fs/promises"
import path from "path";

const clearDir = async (dirPath: string) => {
  try {
    const files = await fs.readdir(dirPath);
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(dirPath, files[i]);
      const stats = await fs.stat(filePath);
      if (stats.isFile()) {
        await fs.unlink(filePath);
      }

    }
  } catch (error) {

  }

}

export default clearDir;
