const fs = require('fs')
const path = require('path')

// Read files
const htmlPath = path.join(__dirname, 'dist', 'index.html')
const cssPath = path.join(__dirname, 'dist', 'assets', 'index-Cpa7m947.css')
const jsPath = path.join(__dirname, 'dist', 'assets', 'index-ts53-z8y.js')

// Find the actual CSS and JS files (they have hashed names)
const assetsDir = path.join(__dirname, 'dist', 'assets')
const files = fs.readdirSync(assetsDir)
const cssFile = files.find((f) => f.endsWith('.css'))
const jsFile = files.find((f) => f.endsWith('.js'))

if (!cssFile || !jsFile) {
  console.error('CSS or JS file not found in dist/assets')
  process.exit(1)
}

const html = fs.readFileSync(htmlPath, 'utf8')
const css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8')
const js = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8')

// Create standalone HTML with everything inlined
const standaloneHTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Arc Raiders Weapons TTKs</title>
    <style>${css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">${js}</script>
  </body>
</html>`

// Write standalone file
const outputPath = path.join(__dirname, 'dist', 'standalone.html')
fs.writeFileSync(outputPath, standaloneHTML)

console.log('Created standalone.html in dist folder')
console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`)

