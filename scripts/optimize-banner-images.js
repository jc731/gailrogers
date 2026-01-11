import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../public/images');
const outputDir = inputDir; // Output to same directory

// Image sizes to generate (widths in pixels)
const sizes = [
  { width: 640, suffix: '-640w' },
  { width: 768, suffix: '-768w' },
  { width: 1024, suffix: '-1024w' },
  { width: 1280, suffix: '-1280w' },
  { width: 1920, suffix: '-1920w' },
];

async function optimizeImage(inputPath, baseName, ext) {
  console.log(`Processing ${baseName}${ext}...`);
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  // Generate each size
  for (const { width, suffix } of sizes) {
    const outputPath = join(outputDir, `${baseName}${suffix}${ext}`);
    
    // Calculate height maintaining aspect ratio
    const height = Math.round((metadata.height / metadata.width) * width);
    
    await image
      .clone()
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 85 }) // Good balance of quality and file size
      .toFile(outputPath);
    
    const stats = await sharp(outputPath).metadata();
    const fs = await import('fs');
    const fileStats = await fs.promises.stat(outputPath);
    const sizeKB = (fileStats.size / 1024).toFixed(1);
    
    console.log(`  ✓ Generated ${basename(outputPath)} (${stats.width}x${stats.height}, ${sizeKB}KB)`);
  }
}

async function main() {
  try {
    const files = await readdir(inputDir);
    const bannerImages = files.filter(file => 
      file.startsWith('home-banner-slide-') && file.endsWith('.webp')
    );
    
    if (bannerImages.length === 0) {
      console.log('No banner images found in public/images/');
      return;
    }
    
    console.log(`Found ${bannerImages.length} banner image(s) to optimize\n`);
    
    for (const file of bannerImages) {
      const inputPath = join(inputDir, file);
      const baseName = basename(file, extname(file));
      const ext = extname(file);
      
      await optimizeImage(inputPath, baseName, ext);
      console.log('');
    }
    
    console.log('✓ All images optimized!');
    console.log('\nNext steps:');
    console.log('1. Update Slider.astro to use srcset with the new image sizes');
    console.log('2. Consider removing the original large images if not needed');
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

main();