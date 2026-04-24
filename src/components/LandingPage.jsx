import { useState } from 'react';
import { parseGitHubUrl } from '../utils/helpers';

const LandingPage = ({ onUrlSubmit, recentCourses, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }
    
    onUrlSubmit(parsed);
  };

  const handleRecentClick = (course) => {
    onUrlSubmit({ owner: course.owner, repo: course.repo, branch: 'main' });
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-mark">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="url(#gradient)" />
              <path d="M14 18L20 24L14 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24 30H34" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#6366F1"/>
                  <stop offset="1" stopColor="#8B5CF6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <h1 className="hero-title">
            Transform GitHub Repos into<br />
            <span className="gradient-text">Beautiful Learning Paths</span>
          </h1>
          
          <p className="hero-subtitle">
            Paste any GitHub repository URL and instantly get a polished, 
            book-like learning environment with progress tracking.
          </p>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="url-form">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="url-input"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading || !url.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Loading...
                  </>
                ) : (
                  <>
                    Start Learning
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        {/* Feature Cards */}
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3>Structured Navigation</h3>
            <p>Automatic detection of chapters, modules, and lessons from your repo structure</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Progress Tracking</h3>
            <p>Mark lessons complete and track your journey through the entire course</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3>Distraction-Free</h3>
            <p>Clean, readable interface optimized for long-form technical content</p>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      {recentCourses && recentCourses.length > 0 && (
        <div className="recent-section">
          <h2 className="section-title">Continue Learning</h2>
          <div className="recent-grid">
            {recentCourses.map((course, index) => (
              <button
                key={`${course.owner}-${course.repo}`}
                onClick={() => handleRecentClick(course)}
                className="recent-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="recent-card-header">
                  <div className="repo-avatar">
                    {course.title.charAt(0).toUpperCase()}
                  </div>
                  <div className="recent-card-info">
                    <h4>{course.title}</h4>
                    <p>{course.owner}/{course.repo}</p>
                  </div>
                </div>
                <div className="recent-card-footer">
                  <span className="last-lesson">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Last: {course.lastLesson}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
