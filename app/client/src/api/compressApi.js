const compressImage = async (bytes, configuratoion) => {
  const buffers = bytes.map((byte) => {
    const lengthBuff = new ArrayBuffer(4);
    const view = new DataView(lengthBuff);
    view.setUint32(0, byte.length);
    const uint8 = new Uint8Array(lengthBuff);
    const concatenated = new Uint8Array(uint8.length + byte.length);
    concatenated.set(uint8, 0);
    concatenated.set(byte, uint8.length);
    return concatenated;
  });

  const combinedByte = buffers.reduce((acc, curr) => {
    console.log(acc.length);
    console.log(curr.length);
    const concatenated = new Uint8Array(acc.length + curr.length);
    concatenated.set(acc, 0);
    concatenated.set(curr, acc.length);
    return concatenated;
  }, new Uint8Array(0));

  const request = {
    method: "POST",
    body: combinedByte.buffer,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  };
  try {
    const response = await fetch("http://localhost:3000/compress", request);
    const blob = await response.blob();
    console.log(blob);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gambar.jpg";
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};

export { compressImage };
