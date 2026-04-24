import { useState, useMemo } from 'react';

const CourseIndex = ({ 
  courseStructure, 
  completionState, 
  currentLesson, 
  onSelectLesson, 
  onToggleChapter,
  progress 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChapters = useMemo(() => {
    if (!searchQuery) return courseStructure.chapters;
    
    const query = searchQuery.toLowerCase();
    return courseStructure.chapters
      .map(chapter => {
        const matchingModules = chapter.modules.filter(module =>
          module.title.toLowerCase().includes(query)
        );
        
        if (chapter.title.toLowerCase().includes(query)) {
          return chapter;
        }
        
        if (matchingModules.length > 0) {
          return { ...chapter, modules: matchingModules };
        }
        
        return null;
      })
      .filter(Boolean);
  }, [courseStructure.chapters, searchQuery]);

  const getLessonStatus = (lessonId) => {
    if (currentLesson?.id === lessonId) return 'active';
    if (completionState[lessonId]) return 'completed';
    return 'default';
  };

  const getChapterProgress = (chapter) => {
    if (!chapter.modules.length) return 0;
    const completed = chapter.modules.filter(m => completionState[m.id]).length;
    return Math.round((completed / chapter.modules.length) * 100);
  };

  return (
    <div className="course-index">
      {/* Header with Progress */}
      <div className="index-header">
        <h2 className="index-title">Course Content</h2>
        <div className="progress-summary">
          <div className="progress-ring">
            <svg width="36" height="36" viewBox="0 0 36 36">
              <circle
                className="progress-ring-bg"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
              />
              <circle
                className="progress-ring-fill"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeDasharray={`${progress * 1.0053} ${100 - progress * 1.0053}`}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="progress-percent">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-container">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Root Files */}
      {courseStructure.rootFiles && courseStructure.rootFiles.length > 0 && (
        <div className="root-files-section">
          {courseStructure.rootFiles.map((file) => (
            <button
              key={file.id}
              onClick={() => onSelectLesson(file, null)}
              className={`lesson-item root-file ${getLessonStatus(file.id)}`}
            >
              <div className="lesson-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span className="lesson-title">{file.title}</span>
              {completionState[file.id] && (
                <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Chapters */}
      <div className="chapters-list">
        {filteredChapters.map((chapter) => {
          const chapterProgress = getChapterProgress(chapter);
          
          return (
            <div key={chapter.id} className="chapter-item">
              <button
                onClick={() => onToggleChapter(chapter.id)}
                className="chapter-header"
              >
                <div className="chapter-info">
                  <svg 
                    className={`chevron ${chapter.expanded ? 'expanded' : ''}`} 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <span className="chapter-title">{chapter.title}</span>
                </div>
                {chapterProgress > 0 && (
                  <span className="chapter-progress-badge">{chapterProgress}%</span>
                )}
              </button>
              
              {chapter.expanded && chapter.modules.length > 0 && (
                <div className="modules-list">
                  {chapter.modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => onSelectLesson(module, chapter)}
                      className={`lesson-item ${getLessonStatus(module.id)}`}
                    >
                      <div className="lesson-icon">
                        {completionState[module.id] ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                        )}
                      </div>
                      <span className="lesson-title">{module.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseIndex;
