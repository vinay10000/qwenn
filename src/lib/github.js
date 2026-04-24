import { marked } from 'marked';

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Parse a GitHub URL to extract owner and repo name
 */
export function parseGitHubUrl(url) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('github.com')) {
      return null;
    }
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) {
      return null;
    }
    return {
      owner: parts[0],
      repo: parts[1],
      branch: parts[3] || 'main',
      path: parts.slice(4).join('/'),
    };
  } catch {
    return null;
  }
}

/**
 * Fetch repository contents from GitHub API
 */
export async function fetchRepoContents(owner, repo, branch = 'main', path = '') {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Repository not found. Make sure it\'s public.');
      }
      if (response.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repo:', error);
    throw error;
  }
}

/**
 * Fetch file content from GitHub
 */
export async function fetchFileContent(downloadUrl) {
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch file content');
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
}

/**
 * Build a tree structure from flat repo contents
 */
export function buildTree(items, basePath = '') {
  const tree = {
    type: 'folder',
    name: basePath.split('/').pop() || 'root',
    path: basePath,
    children: [],
  };
  
  const folders = new Map();
  folders.set('', tree);
  
  items.forEach((item) => {
    const relativePath = item.path.replace(`${basePath}${basePath ? '/' : ''}`, '');
    const parts = relativePath.split('/');
    
    if (item.type === 'dir') {
      let currentPath = '';
      let parent = folders.get('');
      
      parts.forEach((part, index) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        if (!folders.has(currentPath)) {
          const folder = {
            type: 'folder',
            name: part,
            path: currentPath,
            children: [],
          };
          folders.set(currentPath, folder);
          parent.children.push(folder);
        }
        
        parent = folders.get(currentPath);
      });
    } else if (item.type === 'file' && item.name.endsWith('.md')) {
      const parentPath = parts.slice(0, -1).join('/');
      const parent = folders.get(parentPath) || tree;
      
      parent.children.push({
        type: 'file',
        name: item.name,
        path: item.path,
        downloadUrl: item.download_url,
        htmlUrl: item.html_url,
      });
    }
  });
  
  // Sort children: folders first, then files, alphabetically
  const sortChildren = (node) => {
    if (node.children) {
      node.children.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name, undefined, { numeric: true });
      });
      node.children.forEach(sortChildren);
    }
  };
  
  sortChildren(tree);
  return tree;
}

/**
 * Convert markdown to HTML
 */
export function renderMarkdown(content, baseUrl = '') {
  // Transform relative image URLs to absolute GitHub URLs
  const transformedContent = content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      if (src.startsWith('http')) {
        return match;
      }
      const absoluteUrl = `${baseUrl}/${src}`;
      return `![${alt}](${absoluteUrl})`;
    }
  );
  
  return marked.parse(transformedContent);
}

/**
 * Extract headings from markdown for TOC
 */
export function extractHeadings(content) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2],
      id: match[2].toLowerCase().replace(/[^\w]+/g, '-'),
    });
  }
  
  return headings;
}

/**
 * Estimate reading time in minutes
 */
export function estimateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Local storage helpers for progress tracking
 */
export const storage = {
  getProgress(repoKey) {
    try {
      const data = localStorage.getItem(`learndocs_progress_${repoKey}`);
      return data ? JSON.parse(data) : { completed: [], inProgress: [], lastViewed: null };
    } catch {
      return { completed: [], inProgress: [], lastViewed: null };
    }
  },
  
  saveProgress(repoKey, progress) {
    try {
      localStorage.setItem(`learndocs_progress_${repoKey}`, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  },
  
  getRecentRepos() {
    try {
      const data = localStorage.getItem('learndocs_recent');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  
  addRecentRepo(repo) {
    try {
      const recent = this.getRecentRepos();
      const filtered = recent.filter(r => r.fullPath !== repo.fullPath);
      const updated = [repo, ...filtered].slice(0, 5);
      localStorage.setItem('learndocs_recent', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save recent repo:', error);
    }
  },
};
