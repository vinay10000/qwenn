import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { SiLeetcode, SiTryhackme } from 'react-icons/si';
import { FiArrowDown, FiDownload } from 'react-icons/fi';

const socials = [
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/mhvinay', label: 'LinkedIn', color: '#0A66C2' },
  { icon: <SiLeetcode />, href: 'https://leetcode.com/vinay10000', label: 'LeetCode', color: '#FFA116' },
  { icon: <SiTryhackme />, href: 'https://tryhackme.com/p/Dotsh', label: 'TryHackMe', color: '#212C42' },
  { icon: <FaGlobe />, href: 'https://mhvinay.pages.dev/', label: 'Website', color: '#06b6d4' },
  { icon: <FaEnvelope />, href: 'mailto:mhvinay5@gmail.com', label: 'Email', color: '#EA4335' },
];

const words = ['Software Developer', '.NET Developer', 'React Developer', 'Problem Solver'];

import { useState, useEffect } from 'react';

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setWordIdx((wordIdx + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIdx]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', textAlign: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          style={{ display: 'inline-block', marginBottom: 20 }}
        >
          <span style={{
            padding: '6px 18px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
            borderRadius: 50, color: '#06b6d4', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em'
          }}>
            👋 Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
          style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}
        >
          <span style={{ display: 'block', color: '#e2e8f0' }}>Malla Herambh</span>
          <span style={{ display: 'block', background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Vinay
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: '#94a3b8', marginBottom: 36, minHeight: 40 }}
        >
          <span style={{ color: '#06b6d4', fontFamily: "'Fira Code', monospace", fontWeight: 500 }}>
            {displayed}<span style={{ animation: 'blink 1s step-end infinite', color: '#8b5cf6' }}>|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
          style={{ color: '#64748b', maxWidth: 580, margin: '0 auto 44px', fontSize: '1.05rem', lineHeight: 1.7 }}
        >
          Building scalable fullstack applications & enterprise solutions with .NET, React, and Microsoft Dynamics 365.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}
        >
          <a href="mailto:mhvinay5@gmail.com" className="btn-primary">
            <FaEnvelope /> Get in Touch
          </a>
          <button onClick={scrollToAbout} className="btn-outline">
            Explore Work <FiArrowDown />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
          style={{ display: 'flex', gap: 18, justifyContent: 'center' }}
        >
          {socials.map((s, i) => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.25, y: -4 }} whileTap={{ scale: 0.95 }}
              title={s.label}
              style={{
                width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, color: '#94a3b8', fontSize: '1.15rem', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + '44'; e.currentTarget.style.background = s.color + '15'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        onClick={scrollToAbout}
        style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          background: 'none', border: 'none', color: '#64748b', fontSize: '1.5rem',
          animation: 'float 2.5s ease-in-out infinite', cursor: 'pointer',
        }}
      >
        <FiArrowDown />
      </motion.button>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}
