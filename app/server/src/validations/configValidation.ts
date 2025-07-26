const configValidation = async (config: any) => {
  try {

    if (config.mode === 'resize' && (!config.width || !config.height)) {
      throw new Error("Width and height are required for resize mode.");
    }
    if (config.mode === 'targetFileSize' && !config.size) {
      throw new Error("Target file size is required for targetFileSize mode.");
    }
    if (!['jpeg', 'png'].includes(config.format)) {
      throw new Error("Invalid output format.");
    }
    if (config.quality < 1 || config.quality > 100) {
      throw new Error("Quality must be between 1 and 100.");
    }

  } catch (parseError) {
    throw parseError;
  }
}

export default configValidation;

