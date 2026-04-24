import { useState, useMemo } from 'react';
import CourseIndex from './CourseIndex.jsx';
import ContentStage from './ContentStage.jsx';
import TableOfContents from './TableOfContents.jsx';

const LearningLayout = ({ 
  courseStructure, 
  currentLesson, 
  content,
  loading,
  error,
  completionState,
  progress,
  onSelectLesson,
  onToggleChapter,
  onMarkComplete,
  onNavigate,
  onBack,
  repoInfo 
}) => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  // Get all lessons in order for navigation
  const allLessons = useMemo(() => {
    const lessons = [];
    
    // Add root files first
    if (courseStructure.rootFiles) {
      lessons.push(...courseStructure.rootFiles.map(f => ({ ...f, type: 'root' })));
    }
    
    // Add chapter modules
    courseStructure.chapters.forEach(chapter => {
      chapter.modules.forEach(module => {
        lessons.push({ ...module, type: 'module', chapter });
      });
    });
    
    return lessons;
  }, [courseStructure]);

  const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      const prev = allLessons[currentIndex - 1];
      onSelectLesson(prev, prev.chapter || null);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const next = allLessons[currentIndex + 1];
      onSelectLesson(next, next.chapter || null);
    }
  };

  const getBreadcrumbs = () => {
    if (!currentLesson) return [];
    
    const crumbs = [repoInfo?.name || 'Course'];
    
    if (currentLesson.chapter) {
      crumbs.push(currentLesson.chapter.title);
    }
    
    crumbs.push(currentLesson.title);
    
    return crumbs;
  };

  return (
    <div className="learning-layout">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-left">
          <button 
            className="back-btn" 
            onClick={onBack}
            title="Back to home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="repo-info">
            <div className="repo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </div>
            <div className="repo-meta">
              <span className="repo-name">{repoInfo?.full_name}</span>
              <span className="repo-desc">{repoInfo?.description}</span>
            </div>
          </div>
        </div>

        <div className="top-bar-center">
          <div className="overall-progress">
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-label">{progress}% complete</span>
          </div>
        </div>

        <div className="top-bar-right">
          <button
            className="panel-toggle"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            title="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
          <button
            className="panel-toggle"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            title="Toggle table of contents"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Panel - Course Index */}
        <aside className={`left-panel ${leftPanelOpen ? 'open' : 'closed'}`}>
          <CourseIndex
            courseStructure={courseStructure}
            completionState={completionState}
            currentLesson={currentLesson}
            onSelectLesson={onSelectLesson}
            onToggleChapter={onToggleChapter}
            progress={progress}
          />
        </aside>

        {/* Center Panel - Content Stage */}
        <main className="content-panel">
          <ContentStage
            currentLesson={currentLesson}
            content={content}
            loading={loading}
            error={error}
            isComplete={completionState[currentLesson?.id]}
            onMarkComplete={() => onMarkComplete(currentLesson?.id)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            breadcrumbs={getBreadcrumbs()}
          />
        </main>

        {/* Right Panel - Table of Contents */}
        <aside className={`right-panel ${rightPanelOpen ? 'open' : 'closed'}`}>
          <TableOfContents
            content={content}
            currentLesson={currentLesson}
          />
        </aside>
      </div>
    </div>
  );
};

export default LearningLayout;
