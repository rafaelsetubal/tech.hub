import sharp from 'sharp';
const source = 'src/assets/expert.webp';
for (const [name,width] of [['small',480],['medium',768],['large',1024]]) {
 await sharp(source).resize({ width }).webp({ quality: 82 }).toFile('public/images/expert-hero-' + name + '.webp');
}
