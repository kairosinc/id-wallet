function calculateBrightness(imageSrc) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.src = imageSrc;
    img.style.display = "none";
    img.onload = handleImageLoad;
    document.body.appendChild(img);

    function handleImageLoad() {
      let brightness, ctx, imageData, data, colorSum = 0;
      const canvas = document.createElement("canvas");
      const area = this.width * this.height;

      canvas.width = this.width;
      canvas.height = this.height;

      ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      data = imageData.data;

      for (let r, g, b, avg, x = 0, len = data.length; x < len; x += 4) {
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];

        avg = Math.floor((r + g + b) / 3);
        colorSum += avg;
      }

      this.remove();

      resolve(Math.floor(colorSum / area));
    }
  });
}

export function ensureBrightness(screenshot) {
  const minimumBrightness = 65;

  return calculateBrightness(screenshot)
    .then(brightness => {
      return new Promise((resolve, reject) => {
        if (brightness < minimumBrightness)
          reject("checkBrightness");
        else resolve();
      })
    });
}