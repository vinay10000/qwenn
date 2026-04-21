import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const links = ['About','Skills','Experience','Projects','Education','Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = links.map(l => document.getElementById(l.toLowerCase()));
      const current = sections.find(s => s && window.scrollY >= s.offsetTop - 120);
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 24px',
        background: scrolled ? 'rgba(8,11,20,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,179,237,0.08)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <motion.a
          href="#"
          whileHover={{ scale: 1.04 }}
          style={{ fontWeight: 800, fontSize: '1.3rem', background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', cursor: 'pointer' }}
        >
          MHV
        </motion.a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-links-desktop">
          {links.map(l => (
            <motion.button key={l} onClick={() => scrollTo(l)}
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'none', border: 'none', color: active === l.toLowerCase() ? '#06b6d4' : '#94a3b8',
                fontSize: '0.9rem', fontWeight: 500, padding: '6px 14px', borderRadius: 8,
                transition: 'color 0.2s', cursor: 'pointer',
                borderBottom: active === l.toLowerCase() ? '2px solid #06b6d4' : '2px solid transparent'
              }}
            >{l}</motion.button>
          ))}
          <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
            {[
              { icon: <FaLinkedin />, href: 'https://linkedin.com/in/mhvinay', label: 'LinkedIn' },
              { icon: <SiLeetcode />, href: 'https://leetcode.com/vinay10000', label: 'LeetCode' },
            ].map(s => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                style={{ color: '#64748b', fontSize: '1.1rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
              >{s.icon}</motion.a>
            ))}
          </div>
        </div>

        <button className="nav-mobile-btn" onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#e2e8f0', fontSize: '1.4rem', display: 'none' }}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ background: 'rgba(8,11,20,0.98)', backdropFilter: 'blur(20px)', padding: '20px 24px 28px', borderTop: '1px solid rgba(99,179,237,0.1)' }}
          >
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{ display: 'block', width: '100%', background: 'none', border: 'none', color: '#e2e8f0', fontSize: '1.1rem', padding: '12px 0', textAlign: 'left', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >{l}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
