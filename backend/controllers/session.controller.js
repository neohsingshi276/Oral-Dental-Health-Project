const db = require('../db');

// Generate unique 4 digit code
const generateCode = async () => {
  let code, exists;
  do {
    code = Math.floor(1000 + Math.random() * 9000).toString();
    const [rows] = await db.query('SELECT id FROM game_sessions WHERE unique_token = ?', [code]);
    exists = rows.length > 0;
  } while (exists);
  return code;
};

const getSessions = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT s.*, a.name as admin_name FROM game_sessions s JOIN admins a ON s.admin_id = a.id ORDER BY s.created_at DESC'
    );
    res.json({ sessions: rows });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const createSession = async (req, res) => {
  const { session_name } = req.body;
  if (!session_name) return res.status(400).json({ error: 'Session name required' });
  try {
    const unique_token = await generateCode();
    const [result] = await db.query(
      'INSERT INTO game_sessions (admin_id, session_name, unique_token) VALUES (?, ?, ?)',
      [req.admin.id, session_name, unique_token]
    );
    res.status(201).json({ message: 'Session created', sessionId: result.insertId, unique_token });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const updateSession = async (req, res) => {
  const { is_active } = req.body;
  try {
    await db.query('UPDATE game_sessions SET is_active = ? WHERE id = ?', [is_active, req.params.id]);
    res.json({ message: 'Session updated' });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const deleteSession = async (req, res) => {
  try {
    await db.query('DELETE FROM game_sessions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Session deleted' });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const validateSession = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM game_sessions WHERE unique_token = ? AND is_active = true',
      [req.params.token]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Invalid code or session inactive' });
    res.json({ session: rows[0] });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

module.exports = { getSessions, createSession, updateSession, deleteSession, validateSession };
