import path from "path";

const MAX_TOTAL_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const COMPRESSED_DIR = path.join(__dirname, "comprees_temp");

export {
  MAX_TOTAL_UPLOAD_SIZE_BYTES,
  COMPRESSED_DIR
}
