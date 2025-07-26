class CompressConfiguration {
  mode;
  format;
  quality;
  lossless;
  width;
  height;
  size;
  constructor({
    mode = "resize",
    format = "jpeg",
    quality = 50,
    lossless = true,
    width = 100,
    height = 100,
    size = 500,
  }) {
    this.mode = mode;
    this.format = format;
    this.quality = quality;
    this.lossless = lossless;

    if (mode == "resize") {
      if (typeof width != "number" || typeof height != "number") {
        throw new Error("width dan height harus ada !");
      } else {
        this.width = width;
        this.height = height;
      }
    } else {
      if (typeof size != "number") {
        throw new Error("size harus ada !");
      } else {
        this.size = size;
      }
    }
  }
}

export default CompressConfiguration;
