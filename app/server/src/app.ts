import express from "express";
import cors from "cors";
import { uploadSetup } from "./middleware/upload";
import compressRoute from "./routes/compress-route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadSetup)

app.use('/api', compressRoute);

export default app;
