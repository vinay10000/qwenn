import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { SiLeetcode, SiTryhackme } from 'react-icons/si';

const contactItems = [
  { icon: <FaEnvelope />, label: 'Email', value: 'mhvinay5@gmail.com', href: 'mailto:mhvinay5@gmail.com', color: '#ea4335' },
  { icon: <FaPhone />, label: 'Phone', value: '+91 7416514679', href: 'tel:+917416514679', color: '#10b981' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'India', href: null, color: '#f59e0b' },
  { icon: <FaGlobe />, label: 'Website', value: 'mhvinay.pages.dev', href: 'https://mhvinay.pages.dev/', color: '#06b6d4' },
];

const socials = [
  { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/mhvinay', handle: '@mhvinay', color: '#0A66C2' },
  { icon: <SiLeetcode />, label: 'LeetCode', href: 'https://leetcode.com/vinay10000', handle: '@vinay10000', color: '#FFA116' },
  { icon: <SiTryhackme />, label: 'TryHackMe', href: 'https://tryhackme.com/p/Dotsh', handle: '@Dotsh', color: '#212C42' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} style={{ background: 'rgba(13,17,23,0.5)' }}>
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Get In Touch
        </motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          Open to opportunities and collaborations
        </motion.p>

        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 48 }}
          >
            I'm actively looking for new opportunities. Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 40, textAlign: 'left' }}
          >
            {contactItems.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -4, borderColor: item.color + '40' }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center', transition: 'all 0.3s' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: item.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, fontSize: '1.1rem', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = item.color}
                      onMouseLeave={e => e.target.style.color = '#e2e8f0'}
                    >{item.value}</a>
                  ) : (
                    <p style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 500 }}>{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
            style={{ marginBottom: 44 }}
          >
            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Profiles</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              {socials.map((s, i) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, y: -3, borderColor: s.color + '60' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                    background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
                    color: '#94a3b8', fontSize: '0.88rem', transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = s.color; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
                  <span style={{ fontWeight: 500 }}>{s.handle}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
            <a href="mailto:mhvinay5@gmail.com" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 40px' }}>
              <FaEnvelope /> Send a Message
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
