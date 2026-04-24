import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import LearningEnvironment from './components/LearningEnvironment';
import { parseGitHubUrl, fetchRepoContents, buildTree, storage } from './lib/github';
import { Loader2 } from 'lucide-react';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'loading', 'learning'
  const [repoInfo, setRepoInfo] = useState(null);
  const [tree, setTree] = useState(null);
  const [error, setError] = useState(null);
  const [recentRepos, setRecentRepos] = useState([]);

  useEffect(() => {
    setRecentRepos(storage.getRecentRepos());
  }, []);

  const handleUrlSubmit = async (url) => {
    const parsed = parseGitHubUrl(url);
    
    if (!parsed) {
      setError('Invalid GitHub URL. Please check and try again.');
      return;
    }

    setView('loading');
    setError(null);

    try {
      // Fetch root contents
      const contents = await fetchRepoContents(parsed.owner, parsed.repo, parsed.branch);
      
      if (!Array.isArray(contents)) {
        throw new Error('Could not read repository contents');
      }

      // Build tree structure
      const treeStructure = buildTree(contents);
      
      setRepoInfo({
        owner: parsed.owner,
        repo: parsed.repo,
        branch: parsed.branch,
        fullPath: `${parsed.owner}/${parsed.repo}`,
      });
      
      setTree(treeStructure);
      
      // Save to recent repos
      const repoData = {
        fullPath: `${parsed.owner}/${parsed.repo}`,
        lastVisited: Date.now(),
      };
      storage.addRecentRepo(repoData);
      setRecentRepos(storage.getRecentRepos());
      
      setView('learning');
    } catch (err) {
      console.error('Error loading repo:', err);
      setError(err.message || 'Failed to load repository. Please try again.');
      setView('landing');
    }
  };

  const handleBack = () => {
    setView('landing');
    setRepoInfo(null);
    setTree(null);
  };

  return (
    <div className="app">
      {view === 'landing' && (
        <Landing 
          onUrlSubmit={handleUrlSubmit} 
          recentRepos={recentRepos}
        />
      )}
      
      {view === 'loading' && (
        <div className="loading-screen">
          <div className="loading-content">
            <Loader2 className="spinner-large" size={48} />
            <h2>Organizing your course...</h2>
            <p>Analyzing repository structure and preparing your learning environment</p>
          </div>
        </div>
      )}
      
      {view === 'learning' && repoInfo && tree && (
        <LearningEnvironment 
          repoInfo={repoInfo}
          tree={tree}
          onBack={handleBack}
        />
      )}
      
      {error && view === 'landing' && (
        <div className="error-toast">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
