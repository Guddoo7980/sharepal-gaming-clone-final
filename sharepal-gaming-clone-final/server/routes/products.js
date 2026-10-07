import express from 'express';
import { getProducts } from '../products.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { products, source } = await getProducts();
    const q = String(req.query.q || '').trim().toLowerCase();
    const category = String(req.query.category || '').trim();
    const tag = String(req.query.tag || '').trim();
    const inStock = req.query.inStock;
    const sort = String(req.query.sort || 'trending');

    let result = [...products];
    if (q) result = result.filter((p) => p.name.toLowerCase().includes(q));
    if (category && category !== 'All') result = result.filter((p) => p.category === category);
    if (tag) result = result.filter((p) => p.tag.toLowerCase() === tag.toLowerCase());
    if (inStock === 'true') result = result.filter((p) => !p.out_of_stock);

    const sorters = {
      priceLow: (a, b) => a.per_day_rent - b.per_day_rent,
      priceHigh: (a, b) => b.per_day_rent - a.per_day_rent,
      rating: (a, b) => b.rating - a.rating,
      popularity: (a, b) => b.booked_count - a.booked_count,
      trending: (a, b) => (b.tag === 'Trending') - (a.tag === 'Trending') || b.booked_count - a.booked_count
    };
    result.sort(sorters[sort] || sorters.trending);

    res.json({ products: result, total: result.length, source });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load products', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { products, source } = await getProducts();
    const product = products.find((item) => String(item.id) === String(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product, source });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load product', error: error.message });
  }
});

export default router;
