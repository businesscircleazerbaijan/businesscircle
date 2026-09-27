// Netlify build zamanı işə düşür.
// Environment variable-ları (Site settings → Environment variables) oxuyub
// index.html və admin.html-dəki __SUPABASE_URL__ / __SUPABASE_ANON_KEY__
// placeholder-lərini əvəz edir, nəticəni dist/ qovluğuna yazır.

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('XƏTA: SUPABASE_URL və ya SUPABASE_ANON_KEY environment variable-ı tapılmadı.');
  console.error('Netlify → Site settings → Environment variables-də əlavə et.');
  process.exit(1);
}

const outDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const files = ['index.html', 'admin.html'];

files.forEach(function (file) {
  const srcPath = path.join(__dirname, file);
  let html = fs.readFileSync(srcPath, 'utf8');
  html = html.split('__SUPABASE_URL__').join(SUPABASE_URL);
  html = html.split('__SUPABASE_ANON_KEY__').join(SUPABASE_ANON_KEY);
  fs.writeFileSync(path.join(outDir, file), html);
  console.log('Yazıldı: dist/' + file);
});
