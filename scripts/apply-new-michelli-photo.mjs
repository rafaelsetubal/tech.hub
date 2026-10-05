import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// Photo 2 (natural angled smile, looking toward headline):
const photo2 = 'C:/Users/Rafael/.gemini/antigravity/brain/c8997738-3337-40e6-a770-1eefa9a00302/.user_uploaded/media_1791234902566.png';
// Photo 1 (frontal direct gaze):
const photo1 = 'C:/Users/Rafael/.gemini/antigravity/brain/c8997738-3337-40e6-a770-1eefa9a00302/.user_uploaded/media_1791234902316.png';

async function generateVariants(sourceImg) {
  console.log('Generating images from source:', sourceImg);
  if (!fs.existsSync(sourceImg)) {
    throw new Error('Source file not found: ' + sourceImg);
  }

  // 1. Generate base 1024x880 canvas with transparent background and grounded bottom
  const base1024x880 = await sharp(sourceImg)
    .resize(1024, 880, {
      fit: 'contain',
      position: 'bottom',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  // 2. Generate ~1200px desktop version
  const base1200 = await sharp(sourceImg)
    .resize(1200, 1031, {
      fit: 'contain',
      position: 'bottom',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 90, effort: 6 })
    .toFile('public/images/expert-hero-desktop.webp');

  // 3. Generate 1024w (large)
  await sharp(base1024x880)
    .webp({ quality: 90, effort: 6 })
    .toFile('public/images/expert-hero-large.webp');

  // 4. Generate 768w (medium)
  await sharp(base1024x880)
    .resize(768, 660)
    .webp({ quality: 88, effort: 6 })
    .toFile('public/images/expert-hero-medium.webp');

  // 5. Generate ~750w (mobile)
  await sharp(sourceImg)
    .resize(750, 645, {
      fit: 'contain',
      position: 'bottom',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 88, effort: 6 })
    .toFile('public/images/expert-hero-mobile.webp');

  // 6. Generate 480w (small)
  await sharp(base1024x880)
    .resize(480, 412)
    .webp({ quality: 85, effort: 6 })
    .toFile('public/images/expert-hero-small.webp');

  // 7. Update src/assets/ files
  await sharp(base1024x880)
    .webp({ quality: 90, effort: 6 })
    .toFile('src/assets/expert.webp');

  await sharp(base1024x880)
    .png({ compressionLevel: 9 })
    .toFile('src/assets/expert.png');

  await sharp(sourceImg)
    .resize(768, 660, {
      fit: 'contain',
      position: 'bottom',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 88, effort: 6 })
    .toFile('src/assets/expert-mobile.webp');

  // 8. Generate avatar profile (head & shoulders) for src/assets/expert-profile.png
  await sharp(sourceImg)
    .extract({ left: 100, top: 20, width: 500, height: 500 })
    .resize(400, 400)
    .png({ compressionLevel: 9 })
    .toFile('src/assets/expert-profile.png');

  console.log('Successfully generated all responsive WebP and PNG assets!');
}

generateVariants(photo2).catch((err) => {
  console.error(err);
  process.exit(1);
});
