import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillGroups = [
  {
    category: 'Programming Languages',
    color: '#f59e0b',
    icon: '⌨️',
    skills: ['Java', 'Python', 'JavaScript', 'C#', 'SQL'],
  },
  {
    category: 'Frontend',
    color: '#06b6d4',
    icon: '🎨',
    skills: ['React.js', 'React Native', 'HTML5', 'CSS3', 'Vite'],
  },
  {
    category: 'Backend',
    color: '#8b5cf6',
    icon: '⚙️',
    skills: ['Node.js', 'Express.js', 'ASP.NET MVC', 'ADO.NET', 'REST APIs'],
  },
  {
    category: 'Databases',
    color: '#10b981',
    icon: '🗄️',
    skills: ['MySQL', 'SQL Server', 'Supabase', 'Firebase'],
  },
  {
    category: 'Tools & Platforms',
    color: '#ec4899',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'Firebase', 'ImageKit', 'Hardhat', 'Ethereum'],
  },
  {
    category: 'Cloud / Enterprise',
    color: '#3b82f6',
    icon: '☁️',
    skills: ['Microsoft Dynamics 365', 'Power Apps', 'Power Automate', 'MetaMask'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} style={{ background: 'rgba(13,17,23,0.6)' }}>
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Technical Skills
        </motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          Technologies I work with
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {skillGroups.map((group, gi) => (
            <motion.div key={group.category}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: gi * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: group.color + '40' }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: 28, transition: 'all 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: group.color + '18', fontSize: '1.3rem',
                }}>
                  {group.icon}
                </div>
                <h3 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.95rem' }}>{group.category}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.skills.map((skill, si) => (
                  <motion.span key={skill}
                    initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: gi * 0.08 + si * 0.04 }}
                    whileHover={{ scale: 1.08 }}
                    style={{
                      padding: '5px 14px', borderRadius: 50,
                      background: group.color + '12',
                      border: `1px solid ${group.color}30`,
                      color: group.color, fontSize: '0.82rem', fontWeight: 500,
                      cursor: 'default', transition: 'all 0.2s',
                    }}
                  >{skill}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
