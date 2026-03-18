const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  try {
    const [existing] = await db.query('SELECT id FROM admins WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ error: 'Email already registered' });
    const password_hash = await bcrypt.hash(password, 10);
    // First admin = main_admin
    const [count] = await db.query('SELECT COUNT(*) as cnt FROM admins');
    const role = count[0].cnt === 0 ? 'main_admin' : 'admin';
    const [result] = await db.query(
      'INSERT INTO admins (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, password_hash, role]
    );
    res.status(201).json({ message: 'Admin registered', adminId: result.insertId });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role, created_at: admin.created_at } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

const getMe = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, role, created_at FROM admins WHERE id = ?', [req.admin.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Admin not found' });
    res.json({ admin: rows[0] });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

module.exports = { register, login, getMe };
