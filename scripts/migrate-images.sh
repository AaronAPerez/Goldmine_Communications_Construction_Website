#!/bin/bash
# scripts/migrate-images.sh

# Image Migration Script
# Helps find and replace Next.js Image components with OptimizedImage

echo "🔍 Starting image migration process..."

# Create backup directory
BACKUP_DIR="./backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📁 Creating backup in $BACKUP_DIR"

# Find all TSX and JSX files
find . -name "*.tsx" -o -name "*.jsx" | grep -v node_modules | grep -v .next | while read file; do
    # Backup original file
    cp "$file" "$BACKUP_DIR/$(basename "$file")"
    
    # Check if file contains Image import from next/image
    if grep -q "import.*Image.*from.*['\"]next/image['\"]" "$file"; then
        echo "🔄 Processing: $file"
        
        # Replace import statement
        sed -i.bak 's/import Image from ['\''"]next\/image['\''"];/import OptimizedImage from '\''@\/components\/common\/OptimizedImage'\'';/' "$file"
        
        # Replace Image component usage with OptimizedImage
        # This is a basic replacement - manual review recommended
        sed -i.bak 's/<Image/<OptimizedImage/g' "$file"
        sed -i.bak 's/<\/Image>/<\/OptimizedImage>/g' "$file"
        
        # Clean up backup files created by sed
        rm "${file}.bak"
        
        echo "✅ Updated: $file"
    fi
done

echo "🎉 Migration complete!"
echo "📋 Next steps:"
echo "1. Review all updated files manually"
echo "2. Add appropriate priority props to above-the-fold images"
echo "3. Add proper sizes props for responsive images"
echo "4. Test all pages to ensure images load correctly"
echo "5. Remove backup directory when satisfied: rm -rf $BACKUP_DIR"