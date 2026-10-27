import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
const source = path.resolve('assets/originals');
const destination = path.resolve('public/images');
await mkdir(destination, { recursive: true });
for (const filename of (await readdir(source)).sort()) {
  if (!/\.(png|jpe?g)$/i.test(filename)) continue;
  const logo = filename.startsWith('logo-');
  const output = path.join(destination, `${path.parse(filename).name}.webp`);
  await sharp(path.join(source, filename)).rotate()
    .resize({ width: logo ? 640 : 2200, withoutEnlargement: true })
    .webp(logo ? { lossless: true } : { quality: 84, effort: 6 }).toFile(output);
  console.log(`${filename} → ${path.basename(output)} (${Math.round((await stat(output)).size / 1024)} KB)`);
}
await sharp(path.join(source, 'logo-white.png')).resize(96, 96).png().toFile('app/icon.png');
await sharp(path.join(source, 'space-1.png')).rotate()
  .resize(1200, 630, { fit: 'cover', withoutEnlargement: true })
  .jpeg({ quality: 88, mozjpeg: true }).toFile('app/opengraph-image.jpg');
