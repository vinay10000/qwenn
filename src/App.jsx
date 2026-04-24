import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import LearningLayout from './components/LearningLayout.jsx';
import useGitHubRepo from './hooks/useGitHubRepo.js';
import useCourseProgress from './hooks/useCourseProgress.js';
import useMarkdown from './hooks/useMarkdown.js';
import { buildCourseStructure, formatTitle, loadFromStorage, saveToStorage } from './utils/helpers.js';
import './styles/index.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'learning'
  const [repoConfig, setRepoConfig] = useState(null);
  const [courseStructure, setCourseStructure] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  
  const { contents, loading: repoLoading, error: repoError, fetchRepo, fetchFileContent, repoInfo } = useGitHubRepo();
  const { content, loading: contentLoading, error: contentError, loadMarkdown, loadRawMarkdown } = useMarkdown();
  
  // Initialize progress tracking
  const progressTracker = useCourseProgress(
    courseStructure ? { ...courseStructure, repo: repoConfig?.repo, owner: repoConfig?.owner, title: repoInfo?.name } : null
  );

  // Load recent courses on mount
  const [recentCourses, setRecentCourses] = useState([]);
  useEffect(() => {
    const saved = loadFromStorage('recentCourses');
    if (saved) setRecentCourses(saved);
  }, []);

  // Handle URL submission
  const handleUrlSubmit = async (config) => {
    setRepoConfig(config);
    setCurrentView('loading');
    
    try {
      await fetchRepo(config.owner, config.repo, config.branch);
    } catch (error) {
      console.error('Failed to fetch repo:', error);
      setCurrentView('landing');
      return;
    }
  };

  // Build course structure when contents are loaded
  useEffect(() => {
    if (contents.length > 0 && repoInfo) {
      const structure = buildCourseStructure(contents);
      setCourseStructure(structure);
      
      // Restore last viewed lesson if available
      const savedCurrent = loadFromStorage(`current_${config.repo}`);
      if (savedCurrent && structure) {
        // Find the lesson in the structure
        let foundLesson = null;
        let foundChapter = null;
        
        structure.rootFiles.forEach(file => {
          if (file.id === savedCurrent.id) foundLesson = file;
        });
        
        if (!foundLesson) {
          structure.chapters.forEach(chapter => {
            chapter.modules.forEach(module => {
              if (module.id === savedCurrent.id) {
                foundLesson = module;
                foundChapter = chapter;
              }
            });
          });
        }
        
        if (foundLesson) {
          setCurrentLesson(foundLesson);
          setCurrentChapter(foundChapter);
          loadMarkdown(foundLesson.downloadUrl);
        }
      }
      
      setCurrentView('learning');
    }
  }, [contents, repoInfo]);

  // Handle lesson selection
  const handleSelectLesson = async (lesson, chapter) => {
    setCurrentLesson(lesson);
    setCurrentChapter(chapter);
    progressTracker.setCurrentLesson(lesson);
    
    try {
      await loadMarkdown(lesson.downloadUrl);
    } catch (error) {
      console.error('Failed to load lesson:', error);
    }
  };

  // Handle chapter toggle
  const handleToggleChapter = (chapterId) => {
    if (!courseStructure) return;
    
    setCourseStructure(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => 
        chapter.id === chapterId 
          ? { ...chapter, expanded: !chapter.expanded }
          : chapter
      )
    }));
  };

  // Handle mark complete
  const handleMarkComplete = (lessonId) => {
    if (!lessonId) return;
    progressTracker.toggleComplete(lessonId);
  };

  // Handle back to home
  const handleBack = () => {
    setCurrentView('landing');
    setRepoConfig(null);
    setCourseStructure(null);
    setCurrentLesson(null);
    setCurrentChapter(null);
  };

  // Calculate overall progress
  const progress = progressTracker.getProgress();

  // Render loading state
  if (currentView === 'loading') {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="none" />
            <path d="M44 24c0 11.046-8.954 20-20 20" stroke="url(#gradient)" strokeWidth="4" fill="none" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="1s" repeatCount="indefinite" />
            </path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <p>Organizing your course...</p>
        </div>
      </div>
    );
  }

  // Render learning view
  if (currentView === 'learning' && courseStructure) {
    return (
      <LearningLayout
        courseStructure={courseStructure}
        currentLesson={currentLesson}
        content={content}
        loading={contentLoading}
        error={contentError}
        completionState={progressTracker.completionState}
        progress={progress}
        onSelectLesson={handleSelectLesson}
        onToggleChapter={handleToggleChapter}
        onMarkComplete={handleMarkComplete}
        onBack={handleBack}
        repoInfo={repoInfo}
      />
    );
  }

  // Render landing page
  return (
    <LandingPage 
      onUrlSubmit={handleUrlSubmit} 
      recentCourses={recentCourses}
      isLoading={repoLoading}
    />
  );
}

export default App;
