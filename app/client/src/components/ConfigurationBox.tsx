import { useEffect } from "react";
import {
  Checkbox,
  Select,
  Slider,
  Flex,
  Text,
} from "@radix-ui/themes";
import useCompressionConfig from "../hooks/useCompressionConfig";

type GlobalConfigurationProps = {
  handleConfiguration: (config: any) => void
}

const ConfigurationBox = ({ handleConfiguration }: GlobalConfigurationProps) => {
  const {
    mode, setMode,
    format, setFormat,
    quality, setQuality,
    lossless,
    width, setWidth,
    height, setHeight,
    size, setSize,
    isCustomSize, setIsCustomSize,
    getConfiguration
  } = useCompressionConfig();


  useEffect(() => {
    try {
      const currentConfig = getConfiguration();
      handleConfiguration(currentConfig);

    } catch (error: any) {
      console.error("Error generating configuration:", error.message);
    }
  }, [getConfiguration, handleConfiguration]);

  return (
    <div className="font-roboto w-[300px] p-3 border border-s-green-50 rounded-md bg-white shadow-md lg:overflow-x-hidden">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-5">
        Configuration
      </h2>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6">
        <div>
          <label
            htmlFor="compressionMode"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Compress Mode
          </label>
          <Select.Root value={mode}
            onValueChange={(value: "resize" | "targetFileSize") => setMode(value)}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="resize">Resize</Select.Item>
              <Select.Item value="targetFileSize">
                Target File Size (KB)
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        {mode === "resize" ? (
          <div> {/* Tetap div tanpa h-[100px] yang kaku */}
            <label
              htmlFor="widthResizeInput"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Resize Dimensions (px)
            </label>
            <Flex align="center" gap="2"> {/* Menggunakan Flex untuk layout input lebar x tinggi */}
              <input
                type="number"
                placeholder="Lebar"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                id="widthResizeInput"
                className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                min="1"
              />
              <span className="text-gray-500 text-lg font-bold">x</span>
              <input
                type="number"
                placeholder="Tinggi"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                id="heightResizeInput"
                className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                min="1"
              />
            </Flex>
          </div>
        ) : (
          <div>
            <label
              htmlFor="targetSizePreset"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Target File Size (KB)
            </label>
            <Select.Root
              value={isCustomSize ? "custom" : String(size)}
              onValueChange={(value) => {
                if (value === "custom") {
                  setIsCustomSize(true);
                  setSize(100); // Atur ke 0 atau nilai default untuk input kustom
                } else {
                  setIsCustomSize(false);
                  setSize(Number(value));
                }
              }}
            >
              <Select.Trigger className="w-full mb-3" />
              <Select.Content>
                <Select.Item value="100">100 KB</Select.Item>
                <Select.Item value="200">200 KB</Select.Item>
                <Select.Item value="500">500 KB</Select.Item>
                <Select.Item value="custom">Custom</Select.Item>
              </Select.Content>
            </Select.Root>

            {isCustomSize && (
              <input
                type="number"
                id="customTargetSize"
                placeholder="Masukkan KB Kustom"
                value={size === 0 ? "" : size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                min="1"
              />
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="compressionFormat"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Format Output
          </label>
          <Select.Root
            value={format}
            onValueChange={(value: "jpeg" | "png") => setFormat(value)}
          >
            <Select.Trigger className="w-full" />
            <Select.Content>
              <Select.Item value="jpeg">JPEG</Select.Item>
              <Select.Item value="png">PNG</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        {/* Slider Kualitas */}
        {mode == "resize" && (<div className="col-span-full">
          <label
            htmlFor="globalQuality"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Quality: <span className="font-normal">{quality}%</span>
          </label>
          <Slider
            value={[quality]}
            onValueChange={([val]) => setQuality(val)}
            min={1}
            max={100}
            step={1}
          />
        </div>
        )}

      </div>
    </div>
  );
};

export default ConfigurationBox;
