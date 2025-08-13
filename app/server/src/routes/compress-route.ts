import express, { Router } from "express";
import { compressImages } from "../controllers/compress-controller";
import { getUploadPayload } from "../middleware/upload";
import { COMPRESSED_DIR } from "../constants";
import payloadValidation from "../middleware/payloadValidation";
import clearDir from "../lib/clearUploadDir";

const compressRoute = Router();


compressRoute.post('/compress/', getUploadPayload(), payloadValidation, compressImages);
compressRoute.use('/compressed_images/', express.static(COMPRESSED_DIR), () => {
  clearDir(COMPRESSED_DIR)
});

export default compressRoute;
