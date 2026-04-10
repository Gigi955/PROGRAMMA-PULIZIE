/**
 * generate-icon.js — genera assets/icon-only.png 1024x1024 (icona scopa)
 * Colori app: sfondo #2C1A0E (marrone scuro), scopa #C8A882 (beige/crema)
 * Eseguire: node generate-icon.js
 */
const sharp = require('sharp');
const path = require('path');

const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <!-- Sfondo marrone scuro -->
  <rect width="1024" height="1024" fill="#2C1A0E"/>

  <!-- Manico della scopa: rettangolo diagonale (da alto destra a basso sinistra) -->
  <rect x="480" y="130" width="68" height="560" rx="34" fill="#C8A882"
        transform="rotate(-35 514 410)"/>

  <!-- Testina della scopa: rettangolo arrotondato -->
  <rect x="255" y="610" width="300" height="110" rx="24" fill="#C8A882"/>

  <!-- Setole (5 rettangoli arrotondati che pendono dalla testina) -->
  <rect x="272" y="718" width="36" height="95" rx="18" fill="#C8A882"/>
  <rect x="328" y="718" width="36" height="108" rx="18" fill="#C8A882"/>
  <rect x="384" y="718" width="36" height="102" rx="18" fill="#C8A882"/>
  <rect x="440" y="718" width="36" height="108" rx="18" fill="#C8A882"/>
  <rect x="496" y="718" width="36" height="95" rx="18" fill="#C8A882"/>
</svg>`;

const outPath = path.join(__dirname, 'assets', 'icon-only.png');

sharp(Buffer.from(svgString))
  .resize(1024, 1024)
  .png()
  .toFile(outPath)
  .then(info => {
    console.log('✅ Icona scopa generata:', outPath);
    console.log('   Dimensioni:', info.width + 'x' + info.height, '| Size:', (info.size / 1024).toFixed(1) + ' KB');
  })
  .catch(err => {
    console.error('❌ Errore:', err.message);
    process.exit(1);
  });
