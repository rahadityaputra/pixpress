import React from 'react';
import { Flex, Text, Button, Box, Heading } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faImage } from '@fortawesome/free-solid-svg-icons';

interface CompressedImageItem {
  id: number; // Unique ID for each image, useful for React keys
  originalFileName: string; // Original file name
  beforeUrl: string; // URL of the image before compression (Data URL / Object URL)
  afterUrl: string; // URL of the image after compression (from server)
  originalSize: number; // Original size in bytes
  compressedSize: number; // Compressed size in bytes
}

interface CompressionResultsProps {
  results: CompressedImageItem[];
  onDownloadZip: () => void; // Callback to download the ZIP
  onCloseResults: () => void; // Callback to close the results view
}

const CompressionResultBox: React.FC<CompressionResultsProps> = ({ results, onDownloadZip, onCloseResults }) => {

  const calculatePercentage = (original: number, compressed: number): string => {
    if (original === 0) return '0.0';
    const reduction = original - compressed;
    return ((reduction / original) * 100).toFixed(1);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalOriginalSize = results.reduce((sum, item) => sum + item.originalSize, 0);
  const totalCompressedSize = results.reduce((sum, item) => sum + item.compressedSize, 0);
  const totalPercentageSaved = calculatePercentage(totalOriginalSize, totalCompressedSize);

  return (
    <div className='w-[500px] rounded-md shadow-md p-3 border border-s-green-50'>

      <Flex justify="center" align="center" mb="4">
        <Heading size="3" weight="bold">Your Compression Results</Heading>
      </Flex>

      {
        results.length === 0 ? (
          <Flex direction="column" align="center" justify="center" className="flex-grow text-gray-500 h-full">
            <FontAwesomeIcon icon={faImage} size="3x" className="mb-3" />
            <Text size="4" weight="bold">No compression results to display.</Text>
            <Text size="2">Please upload and compress images first.</Text>
          </Flex>
        ) : (
          <>
            <Text size="3" mb="4" align="center">
              You saved a total of{' '}
              <Text weight="bold" color="green" size="4">
                {totalPercentageSaved}% ({formatBytes(totalOriginalSize - totalCompressedSize)})
              </Text>
            </Text>

            <div className='h-[250px]'>
              <div className="flex-grow overflow-scroll p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 h-full">
                {results.map((result, index) => (
                  <Flex
                    key={result.id || index}
                    direction="column"
                    align="center"
                    gap="2"
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition-shadow"
                  >
                    <Text size="2" weight="bold" className="truncate w-full text-center" title={result.originalFileName}>
                      {result.originalFileName}
                    </Text>
                    <Flex direction="column" gap="2" width="100%">
                      <Text size="1" color="gray" align="center">Before Compression</Text>
                      <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center overflow-hidden rounded-md border border-gray-300">
                        {result.beforeUrl ? (
                          <img src={result.beforeUrl} alt={`Original ${result.originalFileName}`} className="object-contain w-full h-full" />
                        ) : (
                          <FontAwesomeIcon icon={faImage} size="2x" className="text-gray-400" />
                        )}
                      </div>
                      <Text size="2" weight="medium" align="center">{formatBytes(result.originalSize)}</Text>

                      <Text size="1" color="gray" align="center" mt="3">After Compression</Text>
                      <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center overflow-hidden rounded-md border border-gray-300">
                        {result.afterUrl ? (
                          <img src={'http://localhost:3000/api/' + result.afterUrl} alt={`Compressed ${result.originalFileName}`} className="object-contain w-full h-full" />
                        ) : (
                          <FontAwesomeIcon icon={faImage} size="2x" className="text-gray-400" />
                        )}
                      </div>
                      <Text size="2" weight="bold" color="blue" align="center">{formatBytes(result.compressedSize)}</Text>
                    </Flex>

                    <Box className="w-full mt-2 p-1 rounded-md" style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                      <Text size="3" weight="bold" color="green" align="center" className="block">
                        Saved: {calculatePercentage(result.originalSize, result.compressedSize)}%
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </div>
            </div>

            <Flex justify="center" mt="5">
              <Button size="3" color="indigo" variant="solid" onClick={onDownloadZip} className="flex items-center gap-2">
                <FontAwesomeIcon icon={faDownload} />
                <Text>Download All Images (.zip)</Text>
              </Button>
            </Flex>
          </>
        )
      }
    </div >
  );
};

export default CompressionResultBox;
