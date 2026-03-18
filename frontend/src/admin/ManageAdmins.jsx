import { useState, useEffect } from 'react';
import api from '../services/api';

const ManageAdmins = ({ currentAdmin }) => {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [showPass, setShowPass] = useState(false);

  const fetchAdmins = () => api.get('/admin/admins').then(res => setAdmins(res.data.admins));
  useEffect(() => { fetchAdmins(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/admins', form);
      setMsg('✅ Admin added successfully!');
      setForm({ name: '', email: '', password: '' });
      fetchAdmins();
    } catch (err) { setMsg('❌ ' + (err.response?.data?.error || 'Failed')); }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete admin "${name}"? This cannot be undone!`)) return;
    try {
      await api.delete(`/admin/admins/${id}`);
      fetchAdmins();
    } catch (err) { alert(err.response?.data?.error || 'Failed to delete'); }
  };

  return (
    <div>
      <div style={s.card}>
        <h2 style={s.cardTitle}>➕ Add New Admin</h2>
        {msg && <div style={msg.includes('✅') ? s.success : s.error}>{msg}</div>}
        <form onSubmit={handleSubmit}>
          <div style={s.formGrid}>
            <div style={s.field}>
              <label style={s.label}>Full Name</label>
              <input style={s.input} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="e.g. Teacher B" />
            </div>
            <div style={s.field}>
              <label style={s.label}>Email</label>
              <input style={s.input} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="teacher@school.com" />
            </div>
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={s.passWrap}>
              <input style={{...s.input, flex:1}} type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} required placeholder="Min 6 characters" minLength={6} />
              <button type="button" style={s.showPassBtn} onClick={() => setShowPass(!showPass)}>{showPass ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <button style={s.btnPrimary} type="submit">Add Admin</button>
        </form>
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>👨‍💼 All Admins ({admins.length})</h2>
        <div style={s.adminList}>
          {admins.map((admin, i) => (
            <div key={admin.id} style={s.adminItem}>
              <div style={s.adminAvatar}>{admin.name?.[0]?.toUpperCase()}</div>
              <div style={s.adminInfo}>
                <div style={s.adminName}>
                  {admin.name}
                  {admin.id === currentAdmin?.id && <span style={s.youBadge}>You</span>}
                </div>
                <div style={s.adminEmail}>{admin.email}</div>
                <div style={s.adminDate}>Joined {new Date(admin.created_at).toLocaleDateString()}</div>
              </div>
              {admin.id !== currentAdmin?.id && (
                <button style={s.btnDelete} onClick={() => handleDelete(admin.id, admin.name)}>🗑️ Remove</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const s = {
  card: { background:'#fff', borderRadius:'16px', padding:'1.5rem', marginBottom:'1.5rem', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' },
  cardTitle: { fontSize:'1.1rem', fontWeight:'700', color:'#1e3a5f', margin:'0 0 1.25rem' },
  formGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'0' },
  field: { marginBottom:'1rem' },
  label: { display:'block', fontSize:'0.85rem', fontWeight:'600', color:'#475569', marginBottom:'0.4rem' },
  input: { width:'100%', padding:'0.65rem 0.9rem', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' },
  passWrap: { display:'flex', gap:'0.5rem', alignItems:'center' },
  showPassBtn: { background:'#f1f5f9', border:'none', borderRadius:'8px', padding:'0.65rem 0.75rem', cursor:'pointer', fontSize:'1rem' },
  btnPrimary: { background:'#2563eb', color:'#fff', border:'none', borderRadius:'8px', padding:'0.65rem 1.5rem', fontWeight:'600', cursor:'pointer', fontSize:'0.9rem' },
  success: { background:'#f0fdf4', color:'#16a34a', padding:'0.75rem 1rem', borderRadius:'8px', marginBottom:'1rem', fontSize:'0.9rem' },
  error: { background:'#fff1f2', color:'#e11d48', padding:'0.75rem 1rem', borderRadius:'8px', marginBottom:'1rem', fontSize:'0.9rem' },
  adminList: { display:'flex', flexDirection:'column', gap:'0.75rem' },
  adminItem: { display:'flex', alignItems:'center', gap:'1rem', padding:'1rem', background:'#fafafa', borderRadius:'12px', border:'1px solid #f1f5f9' },
  adminAvatar: { width:'44px', height:'44px', borderRadius:'50%', background:'#1e3a5f', color:'#FFD700', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'800', fontSize:'1.2rem', flexShrink:0 },
  adminInfo: { flex:1 },
  adminName: { fontWeight:'700', color:'#1e3a5f', fontSize:'0.95rem', display:'flex', alignItems:'center', gap:'0.5rem' },
  youBadge: { background:'#2563eb', color:'#fff', fontSize:'0.65rem', padding:'0.1rem 0.4rem', borderRadius:'6px', fontWeight:'700' },
  adminEmail: { color:'#64748b', fontSize:'0.85rem', margin:'0.15rem 0' },
  adminDate: { color:'#94a3b8', fontSize:'0.78rem' },
  btnDelete: { background:'#fff1f2', color:'#e11d48', border:'none', borderRadius:'8px', padding:'0.5rem 0.9rem', cursor:'pointer', fontWeight:'600', fontSize:'0.82rem', flexShrink:0 },
};

export default ManageAdmins;
