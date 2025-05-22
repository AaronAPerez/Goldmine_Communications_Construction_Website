// const fs = require('fs');
// const path = require('path');
// const glob = require('glob');

// // Find all TSX/JSX files
// const tsxFiles = glob.sync('**/*.{tsx,jsx}', {
//   ignore: ['node_modules/**', '.next/**', 'out/**', 'scripts/**']
// });

// console.log(`Found ${tsxFiles.length} TSX/JSX files to check`);

// // Pattern to match optimized image paths
// const optimizedPathPattern = /\/images\/optimized\/webp\/([^'"]+)\.webp/g;

// // Check if an optimized image exists
// function checkImageExists(imagePath) {
//   const fullPath = path.join(process.cwd(), 'public', imagePath);
//   return fs.existsSync(fullPath);
// }

// // Find the original image
// function findOriginalImage(webpPath) {
//   // Extract the filename
//   const filename = path.basename(webpPath, '.webp');
  
//   // Look for possible original files
//   const possibleExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
//   const originalDir = path.dirname(webpPath.replace('/optimized/webp', ''));
//   const fullOriginalDir = path.join(process.cwd(), 'public', originalDir);
  
//   if (fs.existsSync(fullOriginalDir)) {
//     for (const ext of possibleExtensions) {
//       const possiblePath = path.join(originalDir, `${filename}${ext}`);
//       if (fs.existsSync(path.join(process.cwd(), 'public', possiblePath))) {
//         return possiblePath;
//       }
//     }
//   }
  
//   // Check in WorkOregonPics directory as a fallback
//   const workOregonDir = '/images/WorkOregonPics';
//   const fullWorkOregonDir = path.join(process.cwd(), 'public', workOregonDir);
  
//   if (fs.existsSync(fullWorkOregonDir)) {
//     for (const ext of possibleExtensions) {
//       const possiblePath = path.join(workOregonDir, `${filename}${ext}`);
//       if (fs.existsSync(path.join(process.cwd(), 'public', possiblePath))) {
//         return possiblePath;
//       }
//     }
//   }
  
//   return null;
// }

// // Process each file
// let totalOptimizedPaths = 0;
// let totalMissingImages = 0;
// let totalFixedPaths = 0;

// tsxFiles.forEach(file => {
//   const filePath = path.resolve(file);
//   let content = fs.readFileSync(filePath, 'utf8');
//   let modifiedContent = content;
  
//   // Find all optimized image paths
//   const matches = [...content.matchAll(optimizedPathPattern)];
//   if (matches.length > 0) {
//     totalOptimizedPaths += matches.length;
//     console.log(`\nChecking ${file} - found ${matches.length} optimized image path(s)`);
    
//     matches.forEach(match => {
//       const optimizedPath = match[0];
      
//       // Check if the optimized image exists
//       if (!checkImageExists(optimizedPath)) {
//         totalMissingImages++;
//         console.log(`  ❌ Missing: ${optimizedPath}`);
        
//         // Try to find the original image
//         const originalPath = findOriginalImage(optimizedPath);
//         if (originalPath) {
//           console.log(`  ✅ Found original: ${originalPath}`);
          
//           // Replace the path in the file
//           modifiedContent = modifiedContent.replace(optimizedPath, originalPath);
//           totalFixedPaths++;
//         } else {
//           console.log(`  ⚠️ Couldn't find original for: ${optimizedPath}`);
//         }
//       } else {
//         console.log(`  ✓ Exists: ${optimizedPath}`);
//       }
//     });
    
//     // Save the file if modified
//     if (modifiedContent !== content) {
//       fs.writeFileSync(filePath, modifiedContent, 'utf8');
//       console.log(`  📝 Updated file with fixed paths`);
//     }
//   }
// });

// console.log(`\nSummary:`);
// console.log(`- Found ${totalOptimizedPaths} optimized image paths`);
// console.log(`- ${totalMissingImages} missing images`);
// console.log(`- ${totalFixedPaths} paths fixed`);
// console.log(`- ${totalMissingImages - totalFixedPaths} paths could not be fixed automatically`);