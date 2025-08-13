import app from "./app";

import cron from "node-cron"
import cleanUp from "./lib/cleanup";
import { COMPRESSED_DIR, UPLOAD_DIR } from "./constants";

cron.schedule('0 * * * *', () => {
  cleanUp(COMPRESSED_DIR, 1);
  cleanUp(UPLOAD_DIR, 1);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
