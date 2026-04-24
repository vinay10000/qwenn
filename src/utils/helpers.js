import { useState, useEffect, useCallback } from 'react';

// Parse GitHub URL to extract owner and repo
export const parseGitHubUrl = (url) => {
  try {
    const cleaned = url.trim().replace(/\/$/, '');
    const match = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;
    return {
      owner: match[1],
      repo: match[2],
      branch: 'main' // Default branch, could be enhanced to detect
    };
  } catch {
    return null;
  }
};

// Fetch repository info
export const fetchRepoInfo = async (owner, repo) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!response.ok) throw new Error('Failed to fetch repository');
  return response.json();
};

// Fetch directory contents recursively
export const fetchDirectoryContents = async (owner, repo, path = '', branch = 'main') => {
  const url = path
    ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
    : `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch directory');
  
  const items = await response.json();
  const contents = [];
  
  for (const item of items) {
    if (item.type === 'file' && item.name.endsWith('.md')) {
      contents.push({
        type: 'file',
        name: item.name,
        path: item.path,
        downloadUrl: item.download_url,
      });
    } else if (item.type === 'dir') {
      const subContents = await fetchDirectoryContents(owner, repo, item.path, branch);
      contents.push({
        type: 'directory',
        name: item.name,
        path: item.path,
        children: subContents,
      });
    }
  }
  
  return contents;
};

// Fetch markdown content
export const fetchMarkdown = async (downloadUrl) => {
  const response = await fetch(downloadUrl);
  if (!response.ok) throw new Error('Failed to fetch markdown');
  return response.text();
};

// Simple markdown parser
export const parseMarkdown = (markdown) => {
  let html = markdown;
  
  // Escape HTML
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  
  // Unordered lists
  html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
  
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';
  
  // Clean up empty paragraphs and fix nesting
  html = html.replace(/<p>\s*<(h[1-6]|ul|ol|pre|blockquote)/g, '<$1');
  html = html.replace(/<(\/h[1-6]|\/ul|\/ol|\/pre|\/blockquote)>\s*<\/p>/g, '</$1>');
  html = html.replace(/<p><\/p>/g, '');
  
  return html;
};

// Build course structure from flat file list
export const buildCourseStructure = (contents) => {
  const chapters = [];
  const rootFiles = [];
  
  // Group by top-level directories
  contents.forEach(item => {
    if (item.type === 'directory') {
      chapters.push({
        id: item.path,
        title: formatTitle(item.name),
        path: item.path,
        modules: [],
        completed: false,
        expanded: true,
      });
    } else if (item.type === 'file') {
      rootFiles.push({
        id: item.path,
        title: formatTitle(item.name.replace('.md', '')),
        path: item.path,
        downloadUrl: item.downloadUrl,
        completed: false,
      });
    }
  });
  
  // Process subdirectories as modules
  contents.forEach(item => {
    if (item.type === 'directory' && item.children) {
      const chapter = chapters.find(c => c.path === item.path);
      if (chapter) {
        item.children.forEach(child => {
          if (child.type === 'file') {
            chapter.modules.push({
              id: child.path,
              title: formatTitle(child.name.replace('.md', '')),
              path: child.path,
              downloadUrl: child.downloadUrl,
              completed: false,
            });
          } else if (child.type === 'directory') {
            // Nested directory - treat as submodule group
            child.children?.forEach(subChild => {
              if (subChild.type === 'file') {
                chapter.modules.push({
                  id: subChild.path,
                  title: `${formatTitle(child.name)}: ${formatTitle(subChild.name.replace('.md', ''))}`,
                  path: subChild.path,
                  downloadUrl: subChild.downloadUrl,
                  completed: false,
                });
              }
            });
          }
        });
      }
    }
  });
  
  // Sort chapters and modules
  chapters.sort((a, b) => a.title.localeCompare(b.title));
  chapters.forEach(chapter => {
    chapter.modules.sort((a, b) => a.title.localeCompare(b.title));
  });
  
  return { chapters, rootFiles };
};

// Format file/folder names to readable titles
export const formatTitle = (name) => {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/^\d+[\s.-]*/, '')
    .replace(/\.[^.]+$/, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Calculate progress percentage
export const calculateProgress = (courseStructure, completionState) => {
  let total = 0;
  let completed = 0;
  
  courseStructure.rootFiles.forEach(file => {
    total++;
    if (completionState[file.id]) completed++;
  });
  
  courseStructure.chapters.forEach(chapter => {
    chapter.modules.forEach(module => {
      total++;
      if (completionState[module.id]) completed++;
    });
  });
  
  return total === 0 ? 0 : Math.round((completed / total) * 100);
};

// Local storage helpers
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
};

export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
    return null;
  }
};
