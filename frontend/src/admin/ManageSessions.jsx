import { useState, useEffect } from 'react';
import api from '../services/api';

const ManageSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({ session_name: '' });
  const [msg, setMsg] = useState('');
  const [copied, setCopied] = useState('');

  const fetchSessions = () => api.get('/sessions').then(res => setSessions(res.data.sessions));
  useEffect(() => { fetchSessions(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sessions', form);
      setMsg('✅ Session created!');
      setForm({ session_name: '' });
      fetchSessions();
    } catch (err) { setMsg('❌ ' + (err.response?.data?.error || 'Failed')); }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleToggle = async (id, is_active) => {
    await api.put(`/sessions/${id}`, { is_active: !is_active });
    fetchSessions();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this session? All player data will be lost!')) return;
    await api.delete(`/sessions/${id}`);
    fetchSessions();
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div>
      <div style={s.card}>
        <h2 style={s.cardTitle}>➕ Create New Session</h2>
        <p style={s.hint}>Each session generates a 4-digit code for students to join.</p>
        {msg && <div style={msg.includes('✅') ? s.success : s.error}>{msg}</div>}
        <form onSubmit={handleCreate} style={{display:'flex', gap:'1rem', alignItems:'flex-end', flexWrap:'wrap'}}>
          <div style={{flex:1, minWidth:'200px'}}>
            <label style={s.label}>Session Name</label>
            <input style={s.input} value={form.session_name} onChange={e => setForm({...form, session_name: e.target.value})} required placeholder="e.g. Class 5A — March 2026" />
          </div>
          <button style={s.btnPrimary} type="submit">Create Session</button>
        </form>
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>🎮 All Sessions ({sessions.length})</h2>
        <div style={s.sessionList}>
          {sessions.map(session => (
            <div key={session.id} style={s.sessionCard}>
              <div style={s.sessionTop}>
                <div>
                  <h3 style={s.sessionName}>{session.session_name}</h3>
                  <p style={s.sessionMeta}>Created by {session.admin_name} • {new Date(session.created_at).toLocaleDateString()}</p>
                </div>
                <span style={session.is_active ? s.badgeActive : s.badgeInactive}>
                  {session.is_active ? '🟢 Active' : '🔴 Inactive'}
                </span>
              </div>

              {/* 4 Digit Code Display */}
              <div style={s.codeWrap}>
                <p style={s.codeLabel}>Student Game Code:</p>
                <div style={s.codeBox}>
                  {session.unique_token.split('').map((digit, i) => (
                    <div key={i} style={s.codeDigit}>{digit}</div>
                  ))}
                </div>
                <button
                  style={copied === session.unique_token ? s.btnCopied : s.btnCopy}
                  onClick={() => copyCode(session.unique_token)}
                >
                  {copied === session.unique_token ? '✅ Copied!' : '📋 Copy Code'}
                </button>
              </div>

              <div style={s.sessionActions}>
                <button style={session.is_active ? s.btnDeactivate : s.btnActivate} onClick={() => handleToggle(session.id, session.is_active)}>
                  {session.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button style={s.btnDelete} onClick={() => handleDelete(session.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
          {sessions.length === 0 && <p style={s.muted}>No sessions yet. Create one above!</p>}
        </div>
      </div>
    </div>
  );
};

const s = {
  card: { background:'#fff', borderRadius:'16px', padding:'1.5rem', marginBottom:'1.5rem', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' },
  cardTitle: { fontSize:'1.1rem', fontWeight:'700', color:'#1e3a5f', margin:'0 0 0.5rem' },
  hint: { color:'#64748b', fontSize:'0.88rem', margin:'0 0 1.25rem' },
  label: { display:'block', fontSize:'0.85rem', fontWeight:'600', color:'#475569', marginBottom:'0.4rem' },
  input: { width:'100%', padding:'0.65rem 0.9rem', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' },
  btnPrimary: { background:'#2563eb', color:'#fff', border:'none', borderRadius:'8px', padding:'0.65rem 1.5rem', fontWeight:'600', cursor:'pointer', fontSize:'0.9rem', whiteSpace:'nowrap' },
  success: { background:'#f0fdf4', color:'#16a34a', padding:'0.75rem 1rem', borderRadius:'8px', marginBottom:'1rem', fontSize:'0.9rem' },
  error: { background:'#fff1f2', color:'#e11d48', padding:'0.75rem 1rem', borderRadius:'8px', marginBottom:'1rem', fontSize:'0.9rem' },
  sessionList: { display:'flex', flexDirection:'column', gap:'1rem' },
  sessionCard: { border:'1px solid #e2e8f0', borderRadius:'16px', padding:'1.25rem' },
  sessionTop: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem', gap:'1rem' },
  sessionName: { fontSize:'1rem', fontWeight:'700', color:'#1e3a5f', margin:'0 0 0.25rem' },
  sessionMeta: { fontSize:'0.82rem', color:'#94a3b8', margin:0 },
  badgeActive: { background:'#f0fdf4', color:'#16a34a', padding:'0.3rem 0.75rem', borderRadius:'20px', fontSize:'0.8rem', fontWeight:'600', whiteSpace:'nowrap' },
  badgeInactive: { background:'#fff1f2', color:'#e11d48', padding:'0.3rem 0.75rem', borderRadius:'20px', fontSize:'0.8rem', fontWeight:'600', whiteSpace:'nowrap' },
  codeWrap: { background:'#f8fafc', borderRadius:'12px', padding:'1rem', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' },
  codeLabel: { color:'#475569', fontSize:'0.85rem', fontWeight:'600', margin:0, flexShrink:0 },
  codeBox: { display:'flex', gap:'0.5rem' },
  codeDigit: { width:'44px', height:'52px', background:'#1e3a5f', color:'#FFD700', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', fontWeight:'900', letterSpacing:'0' },
  btnCopy: { background:'#eff6ff', color:'#2563eb', border:'none', borderRadius:'8px', padding:'0.5rem 1rem', cursor:'pointer', fontWeight:'600', fontSize:'0.85rem', whiteSpace:'nowrap' },
  btnCopied: { background:'#f0fdf4', color:'#16a34a', border:'none', borderRadius:'8px', padding:'0.5rem 1rem', cursor:'pointer', fontWeight:'600', fontSize:'0.85rem', whiteSpace:'nowrap' },
  sessionActions: { display:'flex', gap:'0.5rem' },
  btnActivate: { background:'#f0fdf4', color:'#16a34a', border:'none', borderRadius:'6px', padding:'0.4rem 0.9rem', cursor:'pointer', fontWeight:'600', fontSize:'0.82rem' },
  btnDeactivate: { background:'#fff7ed', color:'#ea580c', border:'none', borderRadius:'6px', padding:'0.4rem 0.9rem', cursor:'pointer', fontWeight:'600', fontSize:'0.82rem' },
  btnDelete: { background:'#fff1f2', color:'#e11d48', border:'none', borderRadius:'6px', padding:'0.4rem 0.9rem', cursor:'pointer', fontWeight:'600', fontSize:'0.82rem' },
  muted: { color:'#94a3b8', fontSize:'0.9rem', textAlign:'center', padding:'2rem' },
};

export default ManageSessions;
