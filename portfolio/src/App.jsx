import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Code2,
  Database,
  Layers,
  Cloud,
  Terminal,
  ChevronDown,
  Send,
  Menu,
  X,
  Link as LinkIcon,
  FolderGit
} from 'lucide-react'

const App = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ]

  const skills = {
    programming: ['Java', 'Python', 'JavaScript', 'C#'],
    frontend: ['React.js', 'React Native', 'HTML', 'CSS'],
    backend: ['Node.js', 'Express.js', 'ASP.NET MVC', '.NET'],
    databases: ['MySQL', 'SQL Server', 'Supabase'],
    tools: ['Git', 'Firebase', 'ImageKit'],
    cloud: ['Microsoft Dynamics 365', 'Power Apps', 'Power Automate', 'AWS']
  }

  const experiences = [
    {
      title: 'Programmer Analyst Trainee',
      company: 'Cognizant',
      location: 'Bangalore, India',
      period: '2025 - Present',
      description: [
        'Completed intensive training on full software development lifecycle and enterprise application development.',
        'Developed applications using C#, ASP.NET MVC, SQL Server, and ADO.NET.',
        'Built solutions on Microsoft Dynamics 365 and Power Platform (Power Apps, Power Automate).',
        'Implemented workflow automation and business process solutions using low-code platforms.'
      ]
    }
  ]

  const projects = [
    {
      title: 'Ecommerce Website',
      tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Supabase'],
      description: [
        'Developed a full-stack ecommerce platform with authentication, product catalog, cart, and order tracking.',
        'Designed REST APIs using Node.js and Express.js with MySQL for persistent storage.',
        'Implemented JWT authentication and Google OAuth login with role-based access control.',
        'Built responsive frontend in React with form validation and API integration.'
      ]
    },
    {
      title: 'Blockchain Crowdfunding Platform',
      tech: ['React.js', 'Node.js', 'Ethereum', 'Hardhat', 'Supabase'],
      description: [
        'Built decentralized crowdfunding platform enabling startups to raise milestone-based funding.',
        'Developed Ethereum smart contracts using Hardhat for transparent fund management.',
        'Integrated MetaMask wallet for secure blockchain transactions.',
        'Used Supabase for authentication and database with real-time updates.',
        'Implemented media uploads using ImageKit and notifications with Firebase.'
      ]
    }
  ]

  const certifications = [
    'AWS Academy Cloud Architecting - ICET Academy via Infosys [ AWS ]',
    'Microsoft Certified: Power Platform Functional Consultant Associate',
    'Microsoft Certified: Power Platform Fundamentals'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <motion.nav 
        className={`nav ${scrollY > 50 ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container nav-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            MHV
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="nav-links mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero section">
        <div className="container hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Malla Herambh Vinay
            </motion.h1>
            <motion.p 
              className="hero-subtitle gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Software Developer
            </motion.p>
            
            <motion.div 
              className="hero-contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a href="mailto:mhvinay5@gmail.com" className="contact-item">
                <Mail size={18} />
                mhvinay5@gmail.com
              </a>
              <a href="tel:+917416514679" className="contact-item">
                <Phone size={18} />
                +91 74165 14679
              </a>
              <div className="contact-item">
                <MapPin size={18} />
                India
              </div>
            </motion.div>

            <motion.div 
              className="hero-social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.a
                href="https://linkedin.com/in/mhvinay"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkIcon size={24} />
              </motion.a>
              <motion.a
                href="https://leetcode.com/u/vinay10000"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Code2 size={24} />
              </motion.a>
              <motion.a
                href="https://tryhackme.com/p/Dotsh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Terminal size={24} />
              </motion.a>
              <motion.a
                href="https://mhvinay.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={24} />
              </motion.a>
            </motion.div>

            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <ChevronDown size={32} className="bounce" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          
          <motion.p
            className="about-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Software developer with experience in .NET, Microsoft Dynamics 365, and Power Platform development. 
            Skilled in building fullstack applications using React.js, Node.js, and SQL databases. 
            Experienced in developing scalable backend APIs, authentication systems, and workflow automation solutions. 
            Strong problem-solving skills with active practice on LeetCode and hands-on experience building real-world 
            applications including e-commerce and blockchain platforms.
          </motion.p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.div 
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="skill-card card" variants={itemVariants}>
              <Code2 size={32} className="skill-icon" />
              <h3>Programming</h3>
              <div className="skill-tags">
                {skills.programming.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="skill-card card" variants={itemVariants}>
              <Layers size={32} className="skill-icon" />
              <h3>Frontend</h3>
              <div className="skill-tags">
                {skills.frontend.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="skill-card card" variants={itemVariants}>
              <Terminal size={32} className="skill-icon" />
              <h3>Backend</h3>
              <div className="skill-tags">
                {skills.backend.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="skill-card card" variants={itemVariants}>
              <Database size={32} className="skill-icon" />
              <h3>Databases</h3>
              <div className="skill-tags">
                {skills.databases.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="skill-card card" variants={itemVariants}>
              <Code2 size={32} className="skill-icon" />
              <h3>Tools & Platforms</h3>
              <div className="skill-tags">
                {skills.tools.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="skill-card card" variants={itemVariants}>
              <Cloud size={32} className="skill-icon" />
              <h3>Cloud / Platforms</h3>
              <div className="skill-tags">
                {skills.cloud.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience
          </motion.h2>
          
          <motion.div 
            className="timeline"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="timeline-item card"
                variants={itemVariants}
              >
                <div className="timeline-header">
                  <h3>{exp.title}</h3>
                  <span className="company">{exp.company}</span>
                </div>
                <div className="timeline-meta">
                  <span className="location">{exp.location}</span>
                  <span className="period">{exp.period}</span>
                </div>
                <ul className="timeline-description">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.h2>
          
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="project-card card"
                variants={itemVariants}
              >
                <h3>{project.title}</h3>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <ul className="project-description">
                  {project.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.h3 
            className="certifications-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Certifications
          </motion.h3>
          
          <motion.div 
            className="certifications-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.div 
                key={index} 
                className="certification-card card"
                variants={itemVariants}
              >
                <h4>{cert}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Education
          </motion.h2>
          
          <motion.div 
            className="education-card card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="education-header">
              <h3>Nadimpalli Satyanarayana Raju Institute Of Technology</h3>
              <span className="degree">B.Tech - Computer Science and Engineering</span>
            </div>
            <div className="education-meta">
              <span className="location">Andhra Pradesh, India</span>
              <span className="period">2021 - 2025</span>
              <span className="grade">GPA: 8.2</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          
          <motion.div 
            className="contact-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="contact-info card"
              variants={itemVariants}
            >
              <h3>Let's Connect</h3>
              <p>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.</p>
              
              <div className="contact-details">
                <a href="mailto:mhvinay5@gmail.com" className="contact-detail">
                  <Mail size={20} />
                  mhvinay5@gmail.com
                </a>
                <a href="tel:+917416514679" className="contact-detail">
                  <Phone size={20} />
                  +91 74165 14679
                </a>
                <div className="contact-detail">
                  <MapPin size={20} />
                  India
                </div>
              </div>

              <div className="social-links">
                <motion.a
                  href="https://linkedin.com/in/mhvinay"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LinkIcon size={24} />
                </motion.a>
                <motion.a
                  href="https://leetcode.com/u/vinay10000"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Code2 size={24} />
                </motion.a>
                <motion.a
                  href="https://tryhackme.com/p/Dotsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Terminal size={24} />
                </motion.a>
              </div>
            </motion.div>

            <motion.form 
              className="contact-form card"
              variants={itemVariants}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <motion.button 
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Malla Herambh Vinay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
