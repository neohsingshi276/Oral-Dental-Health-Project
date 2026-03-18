import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🦷 DentalQuest</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/learning" style={styles.link}>Learning</Link>
        <Link to="/did-you-know" style={styles.link}>Did You Know?</Link>
        <Link to="/join" style={styles.link}>Join Game</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontSize: '1.4rem', fontWeight: '700', color: '#1e3a5f', textDecoration: 'none' },
  links: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
  link: { color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' },
};

export default Navbar;
