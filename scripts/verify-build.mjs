import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const fail = (message) => {
  console.error(`Build verification failed: ${message}`);
  process.exitCode = 1;
};
const requireFile = (relativePath) => {
  if (!existsSync(join(dist, relativePath))) fail(`missing dist/${relativePath}`);
};

if (!existsSync(join(dist, 'index.html'))) {
  fail('missing dist/index.html');
  process.exit(1);
}

const html = readFileSync(join(dist, 'index.html'), 'utf8');
requireFile('404.html');
requireFile('brand/fox-user.png');
requireFile('brand/alipay-logo.jpg');

if (html.includes('./src/main.jsx') || html.includes('/src/main.jsx')) {
  fail('HTML still points to uncompiled React source (src/main.jsx)');
}
if (html.includes('fox.svg')) {
  fail('unexpected substitute fox.svg logo reference');
}
if (!html.includes('id="root"')) {
  fail('React root element is missing');
}

const scripts = [...html.matchAll(/<script\\b[^>]*\\bsrc=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
const styles = [...html.matchAll(/<link\\b[^>]*\\bhref=["']([^"']+\\.css(?:\\?[^"']*)?)["'][^>]*>/gi)].map((m) => m[1]);
if (!scripts.length || !scripts.some((src) => /assets\\/[^/]+\\.js(?:\\?.*)?$/.test(src))) {
  fail('no compiled JavaScript bundle referenced from dist/assets');
}
if (!styles.length || !styles.some((href) => /assets\\/[^/]+\\.css(?:\\?.*)?$/.test(href))) {
  fail('no compiled CSS bundle referenced from dist/assets');
}

for (const assetUrl of [...scripts, ...styles]) {
  const relative = decodeURIComponent(assetUrl.split(/[?#]/, 1)[0]).replace(/^\\.\\//, '');
  if (relative.startsWith('/') || relative.includes('..')) {
    fail(`unexpected non-relative or traversal asset path: ${assetUrl}`);
    continue;
  }
  requireFile(relative);
}

const assetsDir = join(dist, 'assets');
if (!existsSync(assetsDir) || !readdirSync(assetsDir).some((name) => name.endsWith('.js'))) {
  fail('dist/assets has no JavaScript bundle');
}
if (!existsSync(join(dist, 'photos'))) {
  fail('dist/photos directory is missing');
}

if (process.exitCode) process.exit(process.exitCode);
console.log('Built site verified: compiled JS/CSS, local assets, approved logos, and Pages fallback are present.');
