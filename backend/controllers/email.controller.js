const db = require('../db');

// Send reminder email (Main Admin only)
const sendReminder = async (req, res) => {
  const { to_admin_id, subject, message } = req.body;
  if (!to_admin_id || !subject || !message) return res.status(400).json({ error: 'All fields required' });
  try {
    // Check if sender is main_admin
    const [sender] = await db.query('SELECT role FROM admins WHERE id = ?', [req.admin.id]);
    if (sender[0]?.role !== 'main_admin') return res.status(403).json({ error: 'Only Main Admin can send reminders' });

    if (to_admin_id === 'all') {
      // Send to all admins
      const [admins] = await db.query('SELECT id FROM admins WHERE id != ?', [req.admin.id]);
      for (const admin of admins) {
        await db.query(
          'INSERT INTO email_reminders (from_admin_id, to_admin_id, subject, message) VALUES (?,?,?,?)',
          [req.admin.id, admin.id, subject, message]
        );
      }
      res.json({ message: `Reminder sent to ${admins.length} admin(s)` });
    } else {
      await db.query(
        'INSERT INTO email_reminders (from_admin_id, to_admin_id, subject, message) VALUES (?,?,?,?)',
        [req.admin.id, to_admin_id, subject, message]
      );
      res.json({ message: 'Reminder sent!' });
    }
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

// Get reminders for logged in admin
const getMyReminders = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT er.*, a.name as from_name
      FROM email_reminders er
      JOIN admins a ON er.from_admin_id = a.id
      WHERE er.to_admin_id = ?
      ORDER BY er.created_at DESC
    `, [req.admin.id]);
    res.json({ reminders: rows });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

// Mark reminder as read
const markRead = async (req, res) => {
  try {
    await db.query('UPDATE email_reminders SET is_read = TRUE WHERE id = ? AND to_admin_id = ?', [req.params.id, req.admin.id]);
    res.json({ message: 'Marked as read' });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

// Get all sent reminders (Main Admin only)
const getSentReminders = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT er.*, a.name as to_name
      FROM email_reminders er
      JOIN admins a ON er.to_admin_id = a.id
      WHERE er.from_admin_id = ?
      ORDER BY er.created_at DESC
    `, [req.admin.id]);
    res.json({ reminders: rows });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

module.exports = { sendReminder, getMyReminders, markRead, getSentReminders };
