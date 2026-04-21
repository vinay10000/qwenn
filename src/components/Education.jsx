import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGraduationCap, FaAward } from 'react-icons/fa';

const education = [
  {
    degree: 'B.Tech — Computer Science and Engineering',
    institution: 'Nadimpalli Satyanarayana Raju Institute Of Technology',
    location: 'Andhra Pradesh, India',
    period: '2021 – 2025',
    grade: 'CGPA: 8.2',
    color: '#06b6d4',
  },
];

const certifications = [
  {
    name: 'AWS Academy Cloud Architecting',
    issuer: 'ICET Academy via Infosys',
    tag: 'AWS',
    icon: '☁️',
    color: '#f59e0b',
  },
  {
    name: 'Microsoft Certified: Power Platform Functional Consultant Associate',
    issuer: 'Microsoft',
    tag: 'Microsoft',
    icon: '🔷',
    color: '#3b82f6',
  },
  {
    name: 'Microsoft Certified: Power Platform Fundamentals',
    issuer: 'Microsoft',
    tag: 'Microsoft',
    icon: '🔷',
    color: '#3b82f6',
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" ref={ref}>
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Education & Certifications
        </motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          Academic background and professional credentials
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }} className="edu-grid">
          <div>
            <h3 style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Education</h3>
            {education.map((edu, i) => (
              <motion.div key={edu.degree}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ borderColor: edu.color + '40', y: -2 }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28, transition: 'all 0.3s' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: edu.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: edu.color, fontSize: '1.3rem', flexShrink: 0 }}>
                    <FaGraduationCap />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.98rem', marginBottom: 6, lineHeight: 1.4 }}>{edu.degree}</h4>
                    <p style={{ color: edu.color, fontWeight: 600, fontSize: '0.88rem', marginBottom: 4 }}>{edu.institution}</p>
                    <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: 12 }}>{edu.location}</p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ padding: '3px 12px', background: edu.color + '15', border: `1px solid ${edu.color}30`, borderRadius: 50, color: edu.color, fontSize: '0.78rem', fontWeight: 600 }}>{edu.period}</span>
                      <span style={{ padding: '3px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 50, color: '#10b981', fontSize: '0.78rem', fontWeight: 600 }}>{edu.grade}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Certifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {certifications.map((cert, i) => (
                <motion.div key={cert.name}
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 + i * 0.1 }}
                  whileHover={{ borderColor: cert.color + '40', y: -2 }}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 22, transition: 'all 0.3s', display: 'flex', gap: 16, alignItems: 'flex-start' }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: cert.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                    {cert.icon}
                  </div>
                  <div>
                    <h4 style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.4, marginBottom: 6 }}>{cert.name}</h4>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{cert.issuer}</span>
                      <span style={{ padding: '2px 10px', background: cert.color + '15', border: `1px solid ${cert.color}30`, borderRadius: 50, color: cert.color, fontSize: '0.72rem', fontWeight: 600 }}>{cert.tag}</span>
                    </div>
                  </div>
                  <FaAward style={{ color: cert.color, fontSize: '1rem', flexShrink: 0, marginLeft: 'auto' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .edu-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
