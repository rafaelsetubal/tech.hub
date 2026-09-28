import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processImage() {
  const inputPath = path.resolve('src/assets/expert-profile.jpg');
  const outputPath = path.resolve('src/assets/expert-profile.png');

  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Create RGBA buffer
  const outBuffer = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    // Calculate max channel / brightness
    const maxVal = Math.max(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    let alpha = 255;
    if (lum < 10 && maxVal < 18) {
      alpha = 0;
    } else if (lum < 35 && maxVal < 45) {
      // Smooth feather falloff for glowing rim light
      alpha = Math.floor(((lum - 10) / 25) * 255);
    }

    outBuffer[i * 4] = r;
    outBuffer[i * 4 + 1] = g;
    outBuffer[i * 4 + 2] = b;
    outBuffer[i * 4 + 3] = alpha;
  }

  await sharp(outBuffer, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log('Successfully generated transparent cutout: src/assets/expert-profile.png');
}

processImage().catch(console.error);
