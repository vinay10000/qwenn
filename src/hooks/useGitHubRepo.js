import { useState, useEffect } from 'react';

export const useGitHubRepo = () => {
  const [repoInfo, setRepoInfo] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepo = async (owner, repo, branch = 'main') => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch repo info
      const info = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!info.ok) throw new Error('Repository not found');
      const repoData = await info.json();
      setRepoInfo(repoData);

      // Fetch contents
      const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;
      const contentsRes = await fetch(contentsUrl);
      if (!contentsRes.ok) throw new Error('Failed to fetch contents');
      const items = await contentsRes.json();
      
      const processed = await processContents(owner, repo, items, branch);
      setContents(processed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const processContents = async (owner, repo, items, branch) => {
    const result = [];
    
    for (const item of items) {
      if (item.type === 'file' && item.name.endsWith('.md')) {
        result.push({
          type: 'file',
          name: item.name,
          path: item.path,
          downloadUrl: item.download_url,
        });
      } else if (item.type === 'dir') {
        const children = await processDirectory(owner, repo, item.path, branch);
        result.push({
          type: 'directory',
          name: item.name,
          path: item.path,
          children,
        });
      }
    }
    
    return result;
  };

  const processDirectory = async (owner, repo, path, branch) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    
    const items = await response.json();
    const result = [];
    
    for (const item of items) {
      if (item.type === 'file' && item.name.endsWith('.md')) {
        result.push({
          type: 'file',
          name: item.name,
          path: item.path,
          downloadUrl: item.download_url,
        });
      } else if (item.type === 'dir') {
        const children = await processDirectory(owner, repo, item.path, branch);
        result.push({
          type: 'directory',
          name: item.name,
          path: item.path,
          children,
        });
      }
    }
    
    return result;
  };

  const fetchFileContent = async (downloadUrl) => {
    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error('Failed to fetch file');
    return response.text();
  };

  return {
    repoInfo,
    contents,
    loading,
    error,
    fetchRepo,
    fetchFileContent,
  };
};

export default useGitHubRepo;
