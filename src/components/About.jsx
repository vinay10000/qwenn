import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const stats = [
  { label: 'Years Experience', value: '1+' },
  { label: 'Projects Built', value: '10+' },
  { label: 'Certifications', value: '3' },
  { label: 'LeetCode Problems', value: '100+' },
];

const info = [
  { icon: <FaMapMarkerAlt />, text: 'India' },
  { icon: <FaEnvelope />, text: 'mhvinay5@gmail.com', href: 'mailto:mhvinay5@gmail.com' },
  { icon: <FaPhone />, text: '+91 7416514679', href: 'tel:+917416514679' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          About Me
        </motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          Passionate developer building real-world solutions
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}
          className="about-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 36 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: 24 }}>
                MV
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, color: '#e2e8f0' }}>Malla Herambh Vinay</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}>
                Software developer with experience in .NET, Microsoft Dynamics 365, and Power Platform development. Skilled in building fullstack applications using React.js, Node.js, and SQL databases.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>
                Experienced in developing scalable backend APIs, authentication systems, and workflow automation solutions. Active competitive programmer with a passion for blockchain and decentralized applications.
              </p>
              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {info.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#64748b', fontSize: '0.9rem' }}>
                    <span style={{ color: '#06b6d4', fontSize: '0.85rem' }}>{item.icon}</span>
                    {item.href ? <a href={item.href} style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#06b6d4'}
                      onMouseLeave={e => e.target.style.color = '#94a3b8'}
                    >{item.text}</a> : <span style={{ color: '#94a3b8' }}>{item.text}</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.35 + i * 0.08 }}
                  whileHover={{ scale: 1.04, borderColor: 'rgba(6,182,212,0.3)' }}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 20px', textAlign: 'center', cursor: 'default', transition: 'all 0.3s' }}
                >
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 6 }}>
                    {s.value}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
              <h4 style={{ color: '#06b6d4', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Current Role</h4>
              <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '1.05rem', marginBottom: 4 }}>Programmer Analyst Trainee</p>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 16 }}>Cognizant · Bangalore, India · 2025 – Present</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['C#', 'ASP.NET MVC', 'SQL Server', 'Power Platform', 'Dynamics 365'].map(t => (
                  <span key={t} style={{ padding: '4px 12px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 50, color: '#06b6d4', fontSize: '0.78rem', fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
