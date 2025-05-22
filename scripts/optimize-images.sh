# #!/bin/bash
# # scripts/optimize-images.sh

# echo "🖼️  Optimizing images..."

# # Install sharp for better image processing
# npm install sharp

# # Create optimized image directories
# mkdir -p public/images/optimized
# mkdir -p public/images/webp
# mkdir -p public/images/avif

# # Convert images to WebP and AVIF
# find public/images -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read img; do
#     filename=$(basename "$img")
#     name="${filename%.*}"
    
#     # Convert to WebP
#     npx sharp-cli -f webp -q 85 -o "public/images/webp/${name}.webp" "$img"
    
#     # Convert to AVIF
#     npx sharp-cli -f avif -q 80 -o "public/images/avif/${name}.avif" "$img"
    
#     echo "✅ Optimized: $filename"
# done

# echo "🎉 Image optimization complete!"