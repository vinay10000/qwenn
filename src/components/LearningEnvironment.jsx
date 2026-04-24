import { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Folder,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  ArrowLeft,
  Menu,
  X,
  Maximize2,
  Minimize2,
  Moon,
  Sun
} from 'lucide-react';
import { renderMarkdown, extractHeadings, estimateReadingTime, storage } from '../lib/github';

function CourseIndex({ tree, progress, currentPath, onSelect, expandedFolders, toggleFolder }) {
  const renderItem = (node, depth = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isCurrent = currentPath === node.path;
    const status = progress.completed.includes(node.path) 
      ? 'completed' 
      : progress.inProgress.includes(node.path) 
        ? 'in-progress' 
        : 'default';

    if (node.type === 'folder') {
      return (
        <div key={node.path}>
          <button
            className={`tree-item folder ${isExpanded ? 'expanded' : ''} ${isCurrent ? 'active' : ''}`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={() => toggleFolder(node.path)}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder size={16} className="folder-icon" />
            <span className="tree-label">{node.name}</span>
          </button>
          {isExpanded && node.children && (
            <div className="tree-children">
              {node.children.map(child => renderItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={node.path}
        className={`tree-item file ${status} ${isCurrent ? 'active' : ''}`}
        style={{ paddingLeft: `${depth * 12 + 24}px` }}
        onClick={() => onSelect(node)}
      >
        {status === 'completed' ? (
          <CheckCircle size={16} className="status-icon completed" />
        ) : status === 'in-progress' ? (
          <Clock size={16} className="status-icon in-progress" />
        ) : (
          <Circle size={16} className="status-icon default" />
        )}
        <FileText size={16} className="file-icon" />
        <span className="tree-label">{node.name.replace('.md', '')}</span>
      </button>
    );
  };

  return (
    <div className="course-index">
      <div className="index-header">
        <BookOpen size={20} />
        <span className="index-title">Course Content</span>
      </div>
      <div className="index-content">
        {tree.children?.map(child => renderItem(child))}
      </div>
    </div>
  );
}

function TableOfContents({ headings, onJump }) {
  if (!headings || headings.length === 0) return null;

  return (
    <div className="toc">
      <div className="toc-header">
        <span>On this page</span>
      </div>
      <nav className="toc-nav">
        {headings.map((heading, index) => (
          <a
            key={index}
            href={`#heading-${heading.id}`}
            className={`toc-link level-${heading.level}`}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            onClick={(e) => {
              e.preventDefault();
              onJump(heading.id);
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function LearningEnvironment({ repoInfo, tree, onBack }) {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ completed: [], inProgress: [], lastViewed: null });
  const [expandedFolders, setExpandedFolders] = useState(new Set(['']));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tocOpen, setTocOpen] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const repoKey = `${repoInfo.owner}/${repoInfo.repo}`;

  useEffect(() => {
    const savedProgress = storage.getProgress(repoKey);
    setProgress(savedProgress);
    
    if (savedProgress.lastViewed) {
      findAndLoadLesson(tree, savedProgress.lastViewed);
    }
  }, [repoKey]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const findAndLoadLesson = (node, path) => {
    if (!node) return;
    
    if (node.path === path && node.type === 'file') {
      loadLesson(node);
      return;
    }
    
    if (node.children) {
      for (const child of node.children) {
        findAndLoadLesson(child, path);
      }
    }
  };

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const loadLesson = async (lesson) => {
    setLoading(true);
    setError(null);
    
    try {
      const rawContent = await fetch(lesson.downloadUrl).then(r => r.text());
      setContent(rawContent);
      setHtmlContent(renderMarkdown(rawContent, `https://raw.githubusercontent.com/${repoInfo.owner}/${repoInfo.repo}/${repoInfo.branch}/${lesson.path.split('/').slice(0, -1).join('/')}`));
      setHeadings(extractHeadings(rawContent));
      setCurrentLesson(lesson);
      
      // Update progress
      setProgress(prev => {
        const updated = {
          ...prev,
          inProgress: prev.inProgress.includes(lesson.path) 
            ? prev.inProgress 
            : [...prev.inProgress, lesson.path],
          lastViewed: lesson.path,
        };
        storage.saveProgress(repoKey, updated);
        return updated;
      });
      
      // Expand parent folders
      const parts = lesson.path.split('/');
      setExpandedFolders(prev => {
        const next = new Set(prev);
        let currentPath = '';
        parts.slice(0, -1).forEach(part => {
          currentPath = currentPath ? `${currentPath}/${part}` : part;
          next.add(currentPath);
        });
        return next;
      });
    } catch (err) {
      setError('Failed to load lesson content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markComplete = () => {
    if (!currentLesson) return;
    
    setProgress(prev => {
      const updated = {
        ...prev,
        completed: prev.completed.includes(currentLesson.path)
          ? prev.completed
          : [...prev.completed, currentLesson.path],
        inProgress: prev.inProgress.filter(p => p !== currentLesson.path),
      };
      storage.saveProgress(repoKey, updated);
      return updated;
    });
  };

  const jumpToHeading = (id) => {
    const element = document.getElementById(`heading-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const calculateProgress = () => {
    const countFiles = (node) => {
      if (!node) return 0;
      if (node.type === 'file') return 1;
      if (!node.children) return 0;
      return node.children.reduce((sum, child) => sum + countFiles(child), 0);
    };
    
    const total = countFiles(tree);
    const completed = progress.completed.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const readingTime = estimateReadingTime(content);

  return (
    <div className={`learning-environment ${fullscreen ? 'fullscreen' : ''}`}>
      {/* Header */}
      <header className="env-header">
        <div className="header-left">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="repo-info">
            <h1>{repoInfo.repo}</h1>
            <span className="repo-owner">@{repoInfo.owner}</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
          </div>
          <span className="progress-text">{calculateProgress()}% complete</span>
        </div>
        
        <div className="header-right">
          <button className="icon-button" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-button" onClick={() => setFullscreen(!fullscreen)}>
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="env-body">
        {/* Left Sidebar - Course Index */}
        {sidebarOpen && (
          <aside className="sidebar-left">
            <CourseIndex
              tree={tree}
              progress={progress}
              currentPath={currentLesson?.path}
              onSelect={loadLesson}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          </aside>
        )}
        
        {/* Toggle Sidebar Button */}
        {!sidebarOpen && (
          <button className="toggle-sidebar left" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
        )}
        {sidebarOpen && (
          <button className="toggle-sidebar left close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        )}

        {/* Center - Content */}
        <main className="content-stage">
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading lesson...</p>
            </div>
          )}
          
          {error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}
          
          {!currentLesson && !loading && (
            <div className="empty-state">
              <BookOpen size={48} className="empty-icon" />
              <h2>Select a lesson to begin</h2>
              <p>Choose a lesson from the course index to start learning</p>
            </div>
          )}
          
          {currentLesson && !loading && (
            <article className="lesson-content">
              <div className="lesson-header">
                <nav className="breadcrumbs">
                  {currentLesson.path.split('/').map((part, index, arr) => (
                    <span key={index} className="breadcrumb-item">
                      {index > 0 && <ChevronRight size={14} />}
                      {index === arr.length - 1 ? part.replace('.md', '') : part}
                    </span>
                  ))}
                </nav>
                <h1 className="lesson-title">{currentLesson.name.replace('.md', '')}</h1>
                <div className="lesson-meta">
                  <span className="reading-time">
                    <Clock size={14} />
                    {readingTime} min read
                  </span>
                </div>
              </div>
              
              <div 
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              
              <div className="lesson-footer">
                <button 
                  className={`complete-button ${progress.completed.includes(currentLesson.path) ? 'completed' : ''}`}
                  onClick={markComplete}
                >
                  {progress.completed.includes(currentLesson.path) ? (
                    <>
                      <CheckCircle size={18} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle size={18} />
                      Mark as Complete
                    </>
                  )}
                </button>
              </div>
            </article>
          )}
        </main>

        {/* Right Sidebar - TOC */}
        {tocOpen && headings.length > 0 && (
          <aside className="sidebar-right">
            <TableOfContents headings={headings} onJump={jumpToHeading} />
          </aside>
        )}
      </div>
    </div>
  );
}
