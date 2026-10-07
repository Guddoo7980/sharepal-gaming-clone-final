import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { connectDB } from '../db.js';

const router = express.Router();
const jwtSecret = () => process.env.JWT_SECRET || 'sharepal-clone-development-secret-change-in-production';
const demoEmail = () => (process.env.DEMO_EMAIL || 'demo@sharepalclone.com').toLowerCase();
const demoPassword = () => process.env.DEMO_PASSWORD || 'Demo@123';

function tokenFor(user) {
  return jwt.sign({ sub: String(user.id), email: user.email, name: user.name }, jwtSecret(), { expiresIn: '7d' });
}

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    if (email === demoEmail() && password === demoPassword()) {
      const user = { id: 'demo-user', name: 'Demo User', email };
      return res.json({ token: tokenFor(user), user, mode: 'demo' });
    }

    const connected = await connectDB();
    if (!connected) {
      return res.status(503).json({ message: 'MongoDB is not configured. Use the demo credentials shown in the login window, or add MONGODB_URI to enable registered users.' });
    }

    const userDoc = await User.findOne({ email });
    if (!userDoc || !(await bcrypt.compare(password, userDoc.passwordHash))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const user = { id: userDoc._id, name: userDoc.name, email: userDoc.email };
    res.json({ token: tokenFor(user), user, mode: 'mongodb' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!name || !email || password.length < 6) {
      return res.status(400).json({ message: 'Enter a name, valid email and a password of at least 6 characters.' });
    }
    const connected = await connectDB();
    if (!connected) return res.status(503).json({ message: 'MongoDB is required for registration. Configure MONGODB_URI first.' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'An account with this email already exists.' });
    const passwordHash = await bcrypt.hash(password, 12);
    const userDoc = await User.create({ name, email, passwordHash });
    const user = { id: userDoc._id, name: userDoc.name, email: userDoc.email };
    res.status(201).json({ token: tokenFor(user), user, mode: 'mongodb' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed.', error: error.message });
  }
});

router.get('/me', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Missing token.' });
  try {
    const payload = jwt.verify(token, jwtSecret());
    res.json({ user: { id: payload.sub, email: payload.email, name: payload.name } });
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
});

export default router;
