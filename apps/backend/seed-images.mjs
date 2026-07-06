// Run: STRAPI_SEED_TOKEN=xxx node seed-images.mjs
// Uses a local placeholder image and attaches it to products, blogs, about-page

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const API = 'http://localhost:1337/api';
const TOKEN = process.env.STRAPI_SEED_TOKEN;

if (!TOKEN) {
  console.error('Нужен STRAPI_SEED_TOKEN. Запуск: STRAPI_SEED_TOKEN=xxx node seed-images.mjs');
  process.exit(1);
}

const api = axios.create({
  baseURL: API,
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLACEHOLDER_PATH = path.resolve(__dirname, '../../public/images/images.jpeg');
const placeholderBuffer = fs.readFileSync(PLACEHOLDER_PATH);

// Upload the placeholder to Strapi and return the media ID
async function uploadImage(filename) {
  const form = new FormData();
  form.append('files', placeholderBuffer, { filename, contentType: 'image/jpeg' });
  const res = await axios.post(`${API}/upload`, form, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...form.getHeaders(),
    },
  });
  return res.data[0].id;
}

// Get all items from a collection (handle pagination)
async function getAll(endpoint) {
  const res = await api.get(`${endpoint}?pagination[pageSize]=100`);
  return res.data.data;
}

// Update a single record
async function updateRecord(endpoint, id, data) {
  await api.put(`${endpoint}/${id}`, { data });
}

async function seedProductImages() {
  console.log('\nЗагружаю картинки для продуктов...');
  const products = await getAll('/products');
  let ok = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    try {
      const imageId = await uploadImage(`product-${product.id}.jpg`);
      await updateRecord('/products', product.id, { image: imageId });
      ok++;
      process.stdout.write('.');
    } catch (err) {
      process.stdout.write('x');
      console.error(`\n  Ошибка продукт ${product.id}:`, err.response?.data?.error?.message ?? err.message);
    }
  }
  console.log(`\n  ✅ Продукты: ${ok}/${products.length}`);
}

async function seedBlogImages() {
  console.log('\nЗагружаю картинки для блога...');
  const posts = await getAll('/blogs');
  let ok = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    try {
      const imageId = await uploadImage(`blog-${post.id}.jpg`);
      await updateRecord('/blogs', post.id, { image: imageId });
      ok++;
      process.stdout.write('.');
    } catch (err) {
      process.stdout.write('x');
      console.error(`\n  Ошибка пост ${post.id}:`, err.response?.data?.error?.message ?? err.message);
    }
  }
  console.log(`\n  ✅ Блог: ${ok}/${posts.length}`);
}

async function seedAboutPageImage() {
  console.log('\nЗагружаю картинку для About Page...');
  try {
    const imageId = await uploadImage('about-hero.jpg');
    await api.put('/about-page?status=published', { data: { image: imageId } });
    console.log('  ✅ About Page обновлена');
  } catch (err) {
    console.error('  x Ошибка about-page:', err.response?.data?.error?.message ?? err.message);
  }
}

console.log('🖼️  Запускаю заливку картинок...');

seedProductImages()
  .then(() => seedBlogImages())
  .then(() => seedAboutPageImage())
  .then(() => console.log('\n\n🎉 Готово!'))
  .catch(err => {
    console.error('\n❌ Ошибка:', err.response?.data ?? err.message ?? err);
    process.exit(1);
  });