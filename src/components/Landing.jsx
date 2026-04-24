import { useState } from 'react';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function Landing({ onUrlSubmit, recentRepos }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }
    
    if (!url.includes('github.com')) {
      setError('Please enter a valid GitHub URL');
      return;
    }
    
    onUrlSubmit(url);
  };

  const handleRecentClick = (repo) => {
    onUrlSubmit(`https://github.com/${repo.fullPath}`);
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Transform any GitHub repo into a learning path</span>
          </div>
          
          <h1 className="hero-title">
            Learn from GitHub,<br />
            <span className="gradient-text">reimagined</span>
          </h1>
          
          <p className="hero-subtitle">
            Paste a repository URL and instantly get a polished, book-like learning environment 
            with progress tracking, navigation, and a distraction-free reading experience.
          </p>
          
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="url-form">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="url-input"
                autoFocus
              />
              <button type="submit" className="submit-button">
                Start Learning
                <ArrowRight size={18} />
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
          
          {/* Recent Repos */}
          {recentRepos.length > 0 && (
            <div className="recent-section">
              <p className="recent-label">Continue where you left off</p>
              <div className="recent-list">
                {recentRepos.map((repo, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(repo)}
                    className="recent-item"
                  >
                    <BookOpen size={16} />
                    <span>{repo.fullPath}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Visual Element */}
        <div className="hero-visual">
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="preview-content">
              <div className="preview-sidebar"></div>
              <div className="preview-main">
                <div className="preview-line short"></div>
                <div className="preview-line long"></div>
                <div className="preview-line medium"></div>
                <div className="preview-line long"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Structured Navigation</h3>
          <p>Automatic detection of chapters, modules, and lessons from your repo structure</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✓</div>
          <h3>Progress Tracking</h3>
          <p>Mark lessons complete and pick up right where you left off</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Distraction-Free</h3>
          <p>Clean, focused reading experience optimized for learning</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Instant Setup</h3>
          <p>No configuration needed. Just paste a URL and start learning</p>
        </div>
      </div>
    </div>
  );
}
