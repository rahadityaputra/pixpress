import path from "path";

const rootDir = process.cwd();
const MAX_TOTAL_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;
const UPLOAD_DIR = path.join(rootDir, "src/uploads_temp");
const COMPRESSED_DIR = path.join(rootDir, "src/compress_temp");

export {
  MAX_TOTAL_UPLOAD_SIZE_BYTES,
  UPLOAD_DIR,
  COMPRESSED_DIR
}
