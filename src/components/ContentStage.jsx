import { useState, useEffect } from 'react';

const ContentStage = ({ 
  currentLesson, 
  content, 
  loading, 
  error,
  isComplete,
  onMarkComplete,
  onNext,
  onPrevious,
  hasPrevious,
  hasNext,
  breadcrumbs 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.content-scroll');
      if (element) {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const element = document.querySelector('.content-scroll');
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [currentLesson]);

  // Reset scroll when lesson changes
  useEffect(() => {
    const element = document.querySelector('.content-scroll');
    if (element) {
      element.scrollTop = 0;
    }
    setScrollProgress(0);
  }, [currentLesson]);

  if (!currentLesson) {
    return (
      <div className="content-stage empty-state">
        <div className="empty-content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <h2>Select a lesson to begin</h2>
          <p>Choose a chapter or lesson from the sidebar to start learning</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-stage">
      {/* Reading Progress Bar */}
      <div className="reading-progress-bar">
        <div 
          className="reading-progress-fill" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="content-header">
        <nav className="breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="breadcrumb-item">
              {index > 0 && (
                <svg className="breadcrumb-separator" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
              <span className={index === breadcrumbs.length - 1 ? 'current' : ''}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
        
        <div className="content-actions">
          <button 
            className={`complete-btn ${isComplete ? 'completed' : ''}`}
            onClick={onMarkComplete}
          >
            {isComplete ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Completed
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Mark Complete
              </>
            )}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="content-scroll">
        <article className="markdown-content">
          {loading ? (
            <div className="loading-content">
              <div className="shimmer-line" style={{ width: '60%' }}></div>
              <div className="shimmer-line" style={{ width: '80%' }}></div>
              <div className="shimmer-line" style={{ width: '75%' }}></div>
              <div className="shimmer-line" style={{ width: '90%' }}></div>
              <div className="shimmer-spacer"></div>
              <div className="shimmer-line" style={{ width: '70%' }}></div>
              <div className="shimmer-line" style={{ width: '85%' }}></div>
              <div className="shimmer-line" style={{ width: '65%' }}></div>
            </div>
          ) : error ? (
            <div className="error-content">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3>Failed to load content</h3>
              <p>{error}</p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </article>
      </div>

      {/* Footer Navigation */}
      <footer className="content-footer">
        <button 
          className="nav-btn previous" 
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        
        <button 
          className="nav-btn next" 
          onClick={onNext}
          disabled={!hasNext}
        >
          Next
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default ContentStage;
