import CompressConfig from "./CompressConfig"
import ImageFile from "./ImageFile"

type CompressPayload = {
  imagesFiles: ImageFile[],
  config: CompressConfig
}

export default CompressPayload
