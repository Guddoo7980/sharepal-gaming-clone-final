import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'sharepal-clone-api' }));
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

app.use('/api', (req, res) => res.status(404).json({ message: 'API route not found.' }));

export default app;
