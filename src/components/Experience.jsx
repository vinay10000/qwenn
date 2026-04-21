import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    company: 'Cognizant',
    role: 'Programmer Analyst Trainee',
    period: '2025 – Present',
    location: 'Bangalore, India',
    color: '#06b6d4',
    tech: ['C#', 'ASP.NET MVC', 'SQL Server', 'ADO.NET', 'Dynamics 365', 'Power Apps', 'Power Automate'],
    bullets: [
      'Completed intensive training on full software development lifecycle and enterprise application development.',
      'Developed applications using C#, ASP.NET MVC, SQL Server, and ADO.NET.',
      'Built solutions on Microsoft Dynamics 365 and Power Platform (Power Apps, Power Automate).',
      'Implemented workflow automation and business process solutions using low-code platforms.',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Experience
        </motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          My professional journey
        </motion.p>

        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            position: 'absolute', left: 24, top: 0, bottom: 0, width: 2,
            background: 'linear-gradient(to bottom, #06b6d4, #8b5cf6, transparent)',
            borderRadius: 2,
          }} />

          {experiences.map((exp, i) => (
            <motion.div key={exp.company}
              initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{ paddingLeft: 68, marginBottom: 40, position: 'relative' }}
            >
              <div style={{
                position: 'absolute', left: 12, top: 20, width: 26, height: 26,
                borderRadius: '50%', background: exp.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 0 4px rgba(8,11,20,1), 0 0 0 6px ${exp.color}40`,
                fontSize: '0.75rem', color: 'white',
              }}>
                <FaBriefcase />
              </div>

              <motion.div
                whileHover={{ borderColor: exp.color + '40', y: -2 }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32, transition: 'all 0.3s' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{exp.role}</h3>
                    <p style={{ color: exp.color, fontWeight: 600, fontSize: '0.95rem' }}>{exp.company}</p>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 4 }}>{exp.location}</p>
                  </div>
                  <span style={{
                    padding: '5px 16px', background: exp.color + '15',
                    border: `1px solid ${exp.color}30`, borderRadius: 50,
                    color: exp.color, fontSize: '0.82rem', fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>{exp.period}</span>
                </div>

                <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#94a3b8', fontSize: '0.93rem', lineHeight: 1.6 }}>
                      <span style={{ color: exp.color, marginTop: 5, flexShrink: 0, fontSize: '0.5rem' }}>◆</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{ padding: '3px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, color: '#64748b', fontSize: '0.78rem' }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
