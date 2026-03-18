import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const JoinGamePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '']);
  const [nickname, setNickname] = useState('');
  const [step, setStep] = useState('code'); // 'code' | 'nickname'
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { code: urlCode } = useParams();

  useEffect(() => {
    if (urlCode && urlCode.length === 4) {
      setCode(urlCode.split(''));
      api.get(`/sessions/validate/${urlCode}`)
        .then(res => {
          setSession(res.data.session);
          setStep('nickname');
        })
        .catch(() => setError('Invalid code! Please try again.'));
    }
  }, [urlCode]);

  const handleCodeChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const newCode = [...code];
    newCode[idx] = val.slice(-1);
    setCode(newCode);
    // Auto focus next input
    if (val && idx < 3) {
      document.getElementById(`code-${idx + 1}`)?.focus();
    }
  };

  const handleCodeKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      document.getElementById(`code-${idx - 1}`)?.focus();
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 4) return setError('Please enter the full 4-digit code!');
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/sessions/validate/${fullCode}`);
      setSession(res.data.session);
      setStep('nickname');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid code! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNicknameSubmit = async (e) => {
    e.preventDefault();
    if (!nickname.trim()) return setError('Please enter a nickname!');
    setLoading(true);
    setError('');
    try {
      const res = await api.post(`/game/join/${session.unique_token}`, { nickname: nickname.trim() });
      sessionStorage.setItem('player', JSON.stringify(res.data.player));
      navigate(`/game/${session.unique_token}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to join. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .code-input:focus { border-color: #FFD700 !important; background: #1e3a5f !important; }
      `}</style>

      <div style={s.bg}>
        <div style={s.bubble1}>🦷</div>
        <div style={s.bubble2}>⭐</div>
        <div style={s.bubble3}>🌟</div>
        <div style={s.bubble4}>🦷</div>
      </div>

      <div style={s.card}>
        <div style={s.iconWrap}>
          <div style={s.icon}>🗺️</div>
        </div>
        <h1 style={s.title}>Dental Quest!</h1>

        {error && <div style={s.error}>{error}</div>}

        {/* Step 1: Enter Code */}
        {step === 'code' && (
          <>
            <p style={s.subtitle}>Enter the 4-digit code from your teacher</p>
            <form onSubmit={handleCodeSubmit}>
              <div style={s.codeRow}>
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`code-${idx}`}
                    className="code-input"
                    style={s.codeInput}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleCodeChange(idx, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(idx, e)}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <button style={s.btn} type="submit" disabled={loading || code.join('').length !== 4}>
                {loading ? 'Checking...' : '🔍 Check Code'}
              </button>
            </form>
            <div style={s.tips}>
              <p style={s.tipText}>Ask your teacher for the 4-digit game code to join!</p>
            </div>
          </>
        )}

        {/* Step 2: Enter Nickname */}
        {step === 'nickname' && session && (
          <>
            <div style={s.sessionFound}>
              <div style={s.sessionFoundIcon}>✅</div>
              <p style={s.sessionFoundText}>Joined: <strong>{session.session_name}</strong></p>
            </div>
            <p style={s.subtitle}>Now enter your nickname to start!</p>
            <form onSubmit={handleNicknameSubmit}>
              <input
                style={s.input}
                type="text"
                placeholder="Your nickname e.g. SuperBrusher"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                maxLength={20}
                autoFocus
              />
              <p style={s.hint}>{nickname.length}/20 characters</p>
              <button style={s.btn} type="submit" disabled={loading}>
                {loading ? 'Joining...' : '🚀 Start Adventure!'}
              </button>
              <button style={s.backBtn} type="button" onClick={() => { setStep('code'); setError(''); }}>
                ← Change Code
              </button>
            </form>
            <div style={s.tips}>
              <p style={s.tipTitle}>🎮 How to play:</p>
              <p style={s.tipText}>Use <strong>W A S D</strong> or <strong>Arrow Keys</strong> to move</p>
              <p style={s.tipText}>Walk to each checkpoint and press <strong>E</strong> to enter!</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const s = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)', fontFamily: 'sans-serif', padding: '1rem', position: 'relative', overflow: 'hidden' },
  bg: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  bubble1: { position: 'absolute', top: '10%', left: '8%', fontSize: '3rem', animation: 'float 3s ease-in-out infinite' },
  bubble2: { position: 'absolute', top: '20%', right: '10%', fontSize: '2.5rem', animation: 'float 2.5s ease-in-out infinite 0.5s' },
  bubble3: { position: 'absolute', bottom: '20%', left: '12%', fontSize: '2rem', animation: 'float 2s ease-in-out infinite 1s' },
  bubble4: { position: 'absolute', bottom: '15%', right: '8%', fontSize: '3rem', animation: 'float 3.5s ease-in-out infinite 0.3s' },
  card: { background: '#fff', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'fadeIn 0.6s ease', position: 'relative', zIndex: 1 },
  iconWrap: { marginBottom: '1rem' },
  icon: { fontSize: '4rem', animation: 'float 3s ease-in-out infinite', display: 'block' },
  title: { fontSize: '2rem', fontWeight: '800', color: '#1e3a5f', margin: '0 0 0.5rem' },
  subtitle: { color: '#64748b', fontSize: '1rem', margin: '0 0 1.5rem', lineHeight: 1.5 },
  error: { background: '#fff1f2', color: '#e11d48', padding: '0.75rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.9rem' },
  codeRow: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' },
  codeInput: { width: '64px', height: '72px', textAlign: 'center', fontSize: '2rem', fontWeight: '900', borderRadius: '14px', border: '3px solid #e2e8f0', background: '#f8fafc', color: '#1e3a5f', outline: 'none', transition: 'all 0.2s' },
  input: { width: '100%', padding: '0.9rem 1.2rem', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', textAlign: 'center', fontWeight: '600', color: '#1e3a5f', marginBottom: '0.25rem' },
  hint: { color: '#94a3b8', fontSize: '0.78rem', margin: '0.3rem 0 1rem', textAlign: 'right' },
  btn: { width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', marginBottom: '0.75rem' },
  backBtn: { width: '100%', padding: '0.65rem', background: 'transparent', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.9rem', cursor: 'pointer' },
  sessionFound: { background: '#f0fdf4', borderRadius: '12px', padding: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' },
  sessionFoundIcon: { fontSize: '1.2rem' },
  sessionFoundText: { color: '#15803d', fontSize: '0.9rem', margin: 0 },
  tips: { background: '#f8fafc', borderRadius: '12px', padding: '1rem', textAlign: 'left', marginTop: '0.5rem' },
  tipTitle: { fontWeight: '700', color: '#1e3a5f', margin: '0 0 0.5rem', fontSize: '0.9rem' },
  tipText: { color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0', lineHeight: 1.5 },
};

export default JoinGamePage;
