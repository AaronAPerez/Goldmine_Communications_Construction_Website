// const fs = require('fs');
// const path = require('path');
// const glob = require('glob');

// // Find all TSX/JSX files
// const tsxFiles = glob.sync('**/*.{tsx,jsx}', {
//   ignore: ['node_modules/**', '.next/**', 'out/**']
// });

// console.log(`Found ${tsxFiles.length} TSX/JSX files to process`);

// let replacementCount = 0;
// let fileCount = 0;

// tsxFiles.forEach(file => {
//   const filePath = path.resolve(file);
//   let content = fs.readFileSync(filePath, 'utf8');
  
//   // Check if file uses Next.js Image
//   if (content.includes("import Image from 'next/image'") || 
//       content.includes('import Image from "next/image"') ||
//       content.includes("import { Image } from 'next/image'") ||
//       content.includes('import { Image } from "next/image"')) {
    
//     // Replace import statement
//     content = content.replace(
//       /import\s+(?:{\s*)?Image(?:\s*})?\s+from\s+['"]next\/image['"]/g,
//       "import OptimizedImage from '@/components/common/OptimizedImage'"
//     );
    
//     // Replace Image usage with OptimizedImage
//     const originalContent = content;
//     content = content
//       .replace(/<Image(\s+)/g, '<OptimizedImage$1')
//       .replace(/<\/Image>/g, '</OptimizedImage>');
    
//     // Count replacements
//     const replacements = (content.match(/<OptimizedImage/g) || []).length;
//     replacementCount += replacements;
    
//     // Only write file if changes were made
//     if (content !== originalContent) {
//       fs.writeFileSync(filePath, content, 'utf8');
//       fileCount++;
//       console.log(`Updated ${file} - replaced ${replacements} Image components`);
//     }
//   }
// });

// console.log(`\nMigration complete:`);
// console.log(`- Modified ${fileCount} files`);
// console.log(`- Replaced ${replacementCount} Image components with OptimizedImage`);
// console.log(`\nNext steps:`);
// console.log('1. Review the changes manually');
// console.log('2. Add proper loading strategies based on image visibility importance');
// console.log('3. Add proper "sizes" attributes to ensure correct responsive behavior');