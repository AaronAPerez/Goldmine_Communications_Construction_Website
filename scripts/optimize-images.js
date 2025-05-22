// const fs = require('fs');
// const path = require('path');
// const imagemin = require('imagemin');
// const imageminWebp = require('imagemin-webp');
// const imageminAvif = require('imagemin-avif');
// const { execSync } = require('child_process');

// // Directories
// const imageDir = path.join(__dirname, '../public/images');
// const webpDir = path.join(__dirname, '../public/images/optimized/webp');
// const avifDir = path.join(__dirname, '../public/images/optimized/avif');

// // Create output directories if they don't exist
// if (!fs.existsSync(webpDir)) fs.mkdirSync(webpDir, { recursive: true });
// if (!fs.existsSync(avifDir)) fs.mkdirSync(avifDir, { recursive: true });

// // Get all image files recursively
// function getImageFiles(dir, fileList = []) {
//   const files = fs.readdirSync(dir);
  
//   files.forEach(file => {
//     const filePath = path.join(dir, file);
    
//     if (fs.statSync(filePath).isDirectory()) {
//       // Skip the optimized directory to avoid processing already optimized images
//       if (!filePath.includes('/optimized/')) {
//         getImageFiles(filePath, fileList);
//       }
//     } else {
//       // Only include image files
//       if (/\.(jpe?g|png)$/i.test(file)) {
//         fileList.push(filePath);
//       }
//     }
//   });
  
//   return fileList;
// }

// async function optimizeImages() {
//   const imageFiles = getImageFiles(imageDir);
//   console.log(`Found ${imageFiles.length} images to optimize`);
  
//   // Process images in batches to avoid memory issues
//   const batchSize = 10;
  
//   for (let i = 0; i < imageFiles.length; i += batchSize) {
//     const batch = imageFiles.slice(i, i + batchSize);
//     console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(imageFiles.length/batchSize)}`);
    
//     // Convert to WebP
//     await imagemin(batch, {
//       destination: webpDir,
//       plugins: [
//         imageminWebp({
//           quality: 80,
//           method: 6, // Higher method means better compression but slower
//         })
//       ]
//     });
    
//     // Convert to AVIF
//     await imagemin(batch, {
//       destination: avifDir,
//       plugins: [
//         imageminAvif({
//           quality: 65, // AVIF can use lower quality settings while maintaining visual quality
//         })
//       ]
//     });
    
//     // Log progress
//     console.log(`Processed ${Math.min(i + batchSize, imageFiles.length)}/${imageFiles.length} images`);
//   }
  
//   console.log('Image optimization complete!');
  
//   // Calculate and display size savings
//   let originalSize = 0;
//   let webpSize = 0;
//   let avifSize = 0;
  
//   imageFiles.forEach(file => {
//     const fileName = path.basename(file);
//     const webpFile = path.join(webpDir, fileName.replace(/\.(jpe?g|png)$/i, '.webp'));
//     const avifFile = path.join(avifDir, fileName.replace(/\.(jpe?g|png)$/i, '.avif'));
    
//     if (fs.existsSync(file)) originalSize += fs.statSync(file).size;
//     if (fs.existsSync(webpFile)) webpSize += fs.statSync(webpFile).size;
//     if (fs.existsSync(avifFile)) avifSize += fs.statSync(avifFile).size;
//   });
  
//   console.log('\nSize comparison:');
//   console.log(`Original: ${(originalSize / (1024 * 1024)).toFixed(2)} MB`);
//   console.log(`WebP: ${(webpSize / (1024 * 1024)).toFixed(2)} MB (${(100 - (webpSize / originalSize * 100)).toFixed(2)}% reduction)`);
//   console.log(`AVIF: ${(avifSize / (1024 * 1024)).toFixed(2)} MB (${(100 - (avifSize / originalSize * 100)).toFixed(2)}% reduction)`);
// }

// optimizeImages().catch(error => {
//   console.error('Error optimizing images:', error);
//   process.exit(1);
// });