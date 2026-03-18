// ============================================
// src/pages/HomePage.jsx
// ============================================

import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div style={styles.page}>
      <Navbar />

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to DentalQuest! 🦷</h1>
          <p style={styles.heroSubtitle}>
            An interactive adventure to learn about oral health,
            build good habits, and protect your smile!
          </p>
          <div style={styles.heroButtons}>
            <Link to="/learning" style={styles.btnPrimary}>Start Learning</Link>
            <Link to="/did-you-know" style={styles.btnSecondary}>Did You Know?</Link>
          </div>
        </div>
        <div style={styles.heroEmoji}>🦷</div>
      </section>

      {/* Why Dental Health Matters */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Oral Health Matters</h2>
        <p style={styles.sectionSubtitle}>
          Taking care of your teeth and gums is more important than you think!
        </p>
        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>😁</div>
            <h3 style={styles.cardTitle}>Healthy Smile</h3>
            <p style={styles.cardText}>Brushing twice a day keeps your teeth clean, strong, and cavity-free.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🍎</div>
            <h3 style={styles.cardTitle}>Better Overall Health</h3>
            <p style={styles.cardText}>Poor oral health is linked to heart disease, diabetes, and other health issues.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>💪</div>
            <h3 style={styles.cardTitle}>Build Good Habits</h3>
            <p style={styles.cardText}>Starting healthy dental habits early leads to a lifetime of strong teeth.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🧠</div>
            <h3 style={styles.cardTitle}>Boost Confidence</h3>
            <p style={styles.cardText}>A clean healthy smile boosts your confidence and makes a great first impression.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🍽️</div>
            <h3 style={styles.cardTitle}>Supports Proper Digestion</h3>
            <p style={styles.cardText}>The digestion process starts in the mouth. Chewing properly is the first step, breaking down food so the stomach and intestines can absorb nutrients efficiently. Issues like tooth loss or pain can hinder this process, directly impacting nutritional health.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🥰</div>
            <h3 style={styles.cardTitle}>Quality Of Life</h3>
            <p style={styles.cardText}>Oral diseases cause significant pain and discomfort, making it difficult to concentrate, eat, or sleep. This directly causes people to miss school or work, negatively impacting their productivity and daily life</p>
          </div>

        </div>
      </section>

      {/* Quick Facts */}
      <section style={styles.factsSection}>
        <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>Quick Facts 🦷</h2>
        <div style={styles.factsList}>
          <div style={styles.factItem}><span style={styles.factIcon}>⏱️</span><p style={styles.factText}>Brush your teeth for <strong>2 minutes</strong> twice a day</p></div>
          <div style={styles.factItem}><span style={styles.factIcon}>🪥</span><p style={styles.factText}>Replace your toothbrush every <strong>3 months</strong></p></div>
          <div style={styles.factItem}><span style={styles.factIcon}>🧵</span><p style={styles.factText}>Floss <strong>once a day</strong> to remove food between teeth</p></div>
          <div style={styles.factItem}><span style={styles.factIcon}>🍬</span><p style={styles.factText}>Sugar feeds bacteria that cause <strong>cavities</strong></p></div>
          <div style={styles.factItem}><span style={styles.factIcon}>👨‍⚕️</span><p style={styles.factText}>Visit your dentist every <strong>6 months</strong> for a checkup</p></div>
        </div>
      </section>

      {/* Modules */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Explore Our Modules</h2>
        <div style={styles.modules}>
          <div style={styles.moduleCard}>
            <div style={styles.moduleIcon}>📚</div>
            <h3 style={styles.moduleTitle}>Learning Module</h3>
            <p style={styles.moduleText}>Watch videos about oral health, cavities, brushing techniques and more.</p>
            <Link to="/learning" style={styles.moduleBtn}>Go to Learning</Link>
          </div>
          <div style={{ ...styles.moduleCard, background: '#fef9ee' }}>
            <div style={styles.moduleIcon}>🗺️</div>
            <h3 style={styles.moduleTitle}>Game Module</h3>
            <p style={styles.moduleText}>Join an adventure quest through a fantasy world and complete dental challenges!</p>
            <p style={styles.moduleNote}>Get the code from your teacher</p>
            <Link to="/join" style={{ ...styles.moduleBtn, background: '#f59e0b' }}>Join Game</Link>
          </div>
          <div style={{ ...styles.moduleCard, background: '#f0fdf4' }}>
            <div style={styles.moduleIcon}>💡</div>
            <h3 style={styles.moduleTitle}>Did You Know?</h3>
            <p style={styles.moduleText}>Discover fun and interesting facts about teeth and oral health.</p>
            <Link to="/did-you-know" style={{ ...styles.moduleBtn, background: '#16a34a' }}>Explore Facts</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>🦷 DentalQuest — Making oral health fun and interactive</p>
      </footer>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' },
  hero: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4rem', background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)', gap: '2rem' },
  heroContent: { flex: 1, maxWidth: '600px' },
  heroTitle: { fontSize: '2.8rem', fontWeight: '800', color: '#1e3a5f', marginBottom: '1rem', lineHeight: 1.2 },
  heroSubtitle: { fontSize: '1.2rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.6 },
  heroButtons: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  btnPrimary: { background: '#2563eb', color: '#fff', padding: '0.85rem 2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' },
  btnSecondary: { background: '#fff', color: '#2563eb', padding: '0.85rem 2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '1rem', border: '2px solid #2563eb' },
  heroEmoji: { fontSize: '10rem', lineHeight: 1 },
  section: { padding: '4rem' },
  sectionTitle: { fontSize: '2rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.5rem', textAlign: 'center' },
  sectionSubtitle: { textAlign: 'center', color: '#64748b', marginBottom: '2.5rem', fontSize: '1.05rem' },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' },
  card: { background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' },
  cardIcon: { fontSize: '2.5rem', marginBottom: '0.75rem' },
  cardTitle: { fontSize: '1.1rem', fontWeight: '600', color: '#1e3a5f', marginBottom: '0.5rem' },
  cardText: { color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 },
  factsSection: { padding: '4rem', background: '#1e3a5f' },
  factsList: { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '700px', margin: '2rem auto 0' },
  factItem: { display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.1)', padding: '1rem 1.5rem', borderRadius: '10px' },
  factIcon: { fontSize: '1.5rem', flexShrink: 0 },
  factText: { color: '#e2e8f0', margin: 0, fontSize: '1rem', lineHeight: 1.5 },
  modules: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2rem' },
  moduleCard: { background: '#eff6ff', padding: '2rem', borderRadius: '16px', textAlign: 'center' },
  moduleIcon: { fontSize: '3rem', marginBottom: '1rem' },
  moduleTitle: { fontSize: '1.2rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.75rem' },
  moduleText: { color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' },
  moduleNote: { color: '#f59e0b', fontWeight: '600', fontSize: '0.9rem', margin: 0 },
  moduleBtn: { display: 'inline-block', background: '#2563eb', color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' },
  footer: { background: '#0f172a', padding: '2rem', textAlign: 'center' },
  footerText: { color: '#94a3b8', margin: 0, fontSize: '0.95rem' },
};

export default HomePage;
