import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import { connectDB } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productFile = path.resolve(__dirname, '../data/product-list.json');
const localProducts = JSON.parse(fs.readFileSync(productFile, 'utf8')).products;

export function normalizeProduct(product) {
  const name = product.name || '';
  let category = 'PS5 Console';
  if (/racing|wheel/i.test(name)) category = 'Racing Wheel';
  else if (/portal/i.test(name)) category = 'PS5 Games';

  return {
    ...product,
    category,
    available: !product.out_of_stock
  };
}

export async function getProducts() {
  const connected = await connectDB();
  if (connected) {
    const mongoProducts = await Product.find({}).lean();
    if (mongoProducts.length) {
      return { products: mongoProducts.map(normalizeProduct), source: 'mongodb' };
    }
  }
  return { products: localProducts.map(normalizeProduct), source: 'json' };
}
