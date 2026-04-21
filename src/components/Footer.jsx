import { motion } from 'framer-motion';
import { FaLinkedin, FaHeart } from 'react-icons/fa';
import { SiLeetcode, SiTryhackme } from 'react-icons/si';
import { FaGlobe } from 'react-icons/fa';

const socials = [
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/mhvinay', label: 'LinkedIn' },
  { icon: <SiLeetcode />, href: 'https://leetcode.com/vinay10000', label: 'LeetCode' },
  { icon: <SiTryhackme />, href: 'https://tryhackme.com/p/Dotsh', label: 'TryHackMe' },
  { icon: <FaGlobe />, href: 'https://mhvinay.pages.dev/', label: 'Website' },
];

const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{
      background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)',
      padding: '48px 24px 32px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 40, alignItems: 'start', marginBottom: 40 }} className="footer-grid">
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.8rem', background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 10 }}>
              MHV
            </div>
            <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: 220, lineHeight: 1.6 }}>
              Software Developer building scalable web applications and enterprise solutions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', alignSelf: 'center' }}>
            {navLinks.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', padding: '4px 8px', transition: 'color 0.2s', borderRadius: 6 }}
                onMouseEnter={e => e.target.style.color = '#06b6d4'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
              >{link}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            {socials.map(s => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                title={s.label}
                style={{ color: '#64748b', fontSize: '1.1rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >{s.icon}</motion.a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#475569', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} Malla Herambh Vinay. All rights reserved.
          </p>
          <p style={{ color: '#475569', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            Built with <FaHeart style={{ color: '#ec4899', fontSize: '0.7rem' }} /> using React & Vite
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; text-align: center; }
          .footer-grid > div:last-child { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
