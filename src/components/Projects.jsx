import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    title: 'Ecommerce Website',
    emoji: '🛒',
    description: 'Full-stack ecommerce platform with authentication, product catalog, cart, and order tracking.',
    longDesc: 'Designed REST APIs using Node.js and Express.js with MySQL for persistent storage. Implemented JWT authentication and Google OAuth login with role-based access control. Built responsive frontend in React with form validation and API integration.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Supabase', 'JWT', 'OAuth'],
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)',
  },
  {
    title: 'Blockchain Crowdfunding',
    emoji: '⛓️',
    description: 'Decentralized crowdfunding platform enabling startups to raise milestone-based funding.',
    longDesc: 'Developed Ethereum smart contracts using Hardhat for transparent fund management. Integrated MetaMask wallet for secure blockchain transactions. Used Supabase for authentication and database with real-time updates. Implemented media uploads using ImageKit and notifications with Firebase.',
    tech: ['React.js', 'Node.js', 'Ethereum', 'Hardhat', 'Supabase', 'MetaMask', 'Firebase', 'ImageKit'],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  },
];

function ProjectCard({ project, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)', border: `1px solid ${hovered ? project.color + '40' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.35s',
        transform: hovered ? 'translateY(-8px)' : 'none',
        boxShadow: hovered ? `0 20px 40px ${project.color}20` : 'var(--shadow-card)',
        position: 'relative',
      }}
    >
      <div style={{
        height: 180, background: project.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontSize: '5rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))', transition: 'transform 0.4s', transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)' }}>
          {project.emoji}
        </div>
      </div>

      <div style={{ padding: 28 }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 10 }}>{project.title}</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>
          {hovered ? project.longDesc : project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              padding: '3px 10px', background: project.color + '12',
              border: `1px solid ${project.color}25`,
              borderRadius: 50, color: project.color, fontSize: '0.76rem', fontWeight: 500
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} style={{ background: 'rgba(13,17,23,0.5)' }}>
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Projects
        </motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          Things I've built — hover for details
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={0.15 + i * 0.12} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
