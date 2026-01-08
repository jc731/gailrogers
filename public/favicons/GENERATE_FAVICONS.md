# Generating Favicon Files

The SVG favicon (`favicon.svg`) is the source file. To generate the other required favicon formats, use one of these methods:

## Option 1: Online Tools

1. **RealFaviconGenerator** (https://realfavicongenerator.net/)
   - Upload `favicon.svg`
   - Configure settings
   - Download generated files
   - Place in `public/favicons/` directory

2. **Favicon.io** (https://favicon.io/)
   - Upload SVG or create from text/image
   - Download generated package
   - Extract to `public/favicons/` directory

## Option 2: Command Line Tools

### Using ImageMagick (if installed)
```bash
# Generate PNG files from SVG
convert -background none -resize 32x32 favicon.svg favicon-32x32.png
convert -background none -resize 16x16 favicon.svg favicon-16x16.png
convert -background none -resize 180x180 favicon.svg apple-touch-icon.png
convert -background none -resize 192x192 favicon.svg android-chrome-192x192.png
convert -background none -resize 512x512 favicon.svg android-chrome-512x512.png

# Generate ICO file
convert favicon-16x16.png favicon-32x32.png favicon.ico
```

### Using Sharp (Node.js)
```bash
pnpm add -D sharp
# Then create a script to generate favicons
```

## Required Files

After generation, ensure these files exist in `public/favicons/`:
- `favicon.ico` (16x16, 32x32, 48x48 combined)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

## Current Status

- ✅ `favicon.svg` - Created (source file)
- ⏳ Other formats - Need to be generated from SVG

The SVG favicon will work for modern browsers, but PNG/ICO formats are needed for:
- Older browsers (favicon.ico)
- iOS devices (apple-touch-icon.png)
- Android devices (android-chrome-*.png)
- Better cross-platform support



