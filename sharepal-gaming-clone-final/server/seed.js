import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import { connectDB } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/product-list.json'), 'utf8')).products;
const connected = await connectDB();
if (!connected) {
  console.error('MONGODB_URI is required to seed MongoDB.');
  process.exit(1);
}
await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} products.`);
await mongoose.disconnect();
