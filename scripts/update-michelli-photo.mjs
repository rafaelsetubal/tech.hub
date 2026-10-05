import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const sourceImg = 'C:/Users/Rafael/.gemini/antigravity/brain/c8997738-3337-40e6-a770-1eefa9a00302/.user_uploaded/media_1791234902566.png';

async function updatePhotos() {
  console.log('Source:', sourceImg);
  if (!fs.existsSync(sourceImg)) {
    throw new Error('Source image not found: ' + sourceImg);
  }

  const targets = [
    {
      file: 'public/images/expert-hero-desktop.webp',
      width: 1024,
      height: 880,
      format: 'webp',
      quality: 92,
    },
    {
      file: 'public/images/expert-hero-mobile.webp',
      width: 768,
      height: 660,
      format: 'webp',
      quality: 90,
    },
    {
      file: 'src/assets/expert.webp',
      width: 1024,
      height: 880,
      format: 'webp',
      quality: 92,
    },
    {
      file: 'src/assets/expert.png',
      width: 1024,
      height: 880,
      format: 'png',
    },
    {
      file: 'src/assets/expert-mobile.webp',
      width: 768,
      height: 660,
      format: 'webp',
      quality: 90,
    },
  ];

  for (const t of targets) {
    const fullPath = path.resolve(t.file);
    let pipeline = sharp(sourceImg).resize(t.width, t.height, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });

    if (t.format === 'webp') {
      pipeline = pipeline.webp({ quality: t.quality, effort: 6 });
    } else if (t.format === 'png') {
      pipeline = pipeline.png({ compressionLevel: 9 });
    }

    await pipeline.toFile(fullPath);
    const stat = fs.statSync(fullPath);
    console.log(`Updated ${t.file} (${t.width}x${t.height}) -> ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

updatePhotos().catch((err) => {
  console.error(err);
  process.exit(1);
});
