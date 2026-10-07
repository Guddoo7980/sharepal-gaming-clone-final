import 'dotenv/config';
import app from './app.js';
import http from 'http';

const server = http.createServer(app);
server.listen(0, async () => {
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;
  try {
    const health = await fetch(`${base}/api/health`).then(r => r.json());
    const products = await fetch(`${base}/api/products`).then(r => r.json());
    const loginResponse = await fetch(`${base}/api/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'demo@sharepalclone.com', password: 'Demo@123' })
    });
    const login = await loginResponse.json();
    const ok = health.ok && products.products?.length === 23 && Boolean(login.token);
    console.log(JSON.stringify({ ok, health, productCount: products.products?.length, productSource: products.source, loginUser: login.user }, null, 2));
    process.exitCode = ok ? 0 : 1;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
