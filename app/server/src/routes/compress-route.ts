import express, { Router } from "express";
import { compressImages } from "../controllers/compress-controller";
import { getUploadPayload } from "../middleware/upload";
import { COMPRESSED_DIR } from "../controllers/constants";

const compressRoute = Router();

compressRoute.post('/compress/', getUploadPayload(), compressImages);
compressRoute.use('/compressed_images/', express.static(COMPRESSED_DIR));

export default compressRoute;
