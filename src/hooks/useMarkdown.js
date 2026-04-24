import { useState, useEffect } from 'react';

const useMarkdown = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseMarkdown = (markdown) => {
    let html = markdown;
    
    // Escape HTML
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Code blocks with language
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Headers (order matters - h3 first)
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
    
    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr />');
    
    // Unordered lists
    html = html.replace(/^[\-\*] (.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);
    
    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
    
    // Tables
    html = parseTables(html);
    
    // Paragraphs - split by double newlines
    const parts = html.split(/\n\n+/);
    html = parts.map(part => {
      part = part.trim();
      if (!part) return '';
      // Don't wrap if it's already a block element
      if (/^<(h[1-6]|ul|ol|pre|blockquote|table|div|hr)/.test(part)) {
        return part;
      }
      // Replace single newlines with <br> within paragraphs
      part = part.replace(/\n/g, '<br />');
      return `<p>${part}</p>`;
    }).join('');
    
    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p>\s*<(h[1-6]|ul|ol|pre|blockquote|table)/g, '<$1');
    html = html.replace(/<(\/h[1-6]|\/ul|\/ol|\/pre|\/blockquote|\/table)>\s*<\/p>/g, '</$1>');
    
    return html;
  };

  const parseTables = (html) => {
    const lines = html.split('\n');
    const result = [];
    let inTable = false;
    let tableRows = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if this is a table header separator
      if (/^\|?\s*[-:|]+\s*\|?\s*$/.test(line) && inTable) {
        continue; // Skip separator line
      }
      
      // Check if this is a table row
      if (/^\|.*\|$/.test(line) || (/^\|/.test(line) && /\|$/.test(line))) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        
        const cells = line.split('|').filter((_, i, arr) => i !== 0 && i !== arr.length - 1);
        const cellType = tableRows.length === 0 ? 'th' : 'td';
        
        tableRows.push({
          type: tableRows.length === 0 ? 'header' : 'row',
          cells: cells.map(cell => cell.trim()),
        });
      } else {
        if (inTable) {
          // End of table
          result.push(renderTable(tableRows));
          inTable = false;
          tableRows = [];
        }
        result.push(line);
      }
    }
    
    if (inTable) {
      result.push(renderTable(tableRows));
    }
    
    return result.join('\n');
  };

  const renderTable = (rows) => {
    if (rows.length === 0) return '';
    
    const headerRow = rows.find(r => r.type === 'header');
    const dataRows = rows.filter(r => r.type === 'row');
    
    let html = '<table>';
    
    if (headerRow) {
      html += '<thead><tr>';
      headerRow.cells.forEach(cell => {
        html += `<th>${cell}</th>`;
      });
      html += '</tr></thead>';
    }
    
    html += '<tbody>';
    dataRows.forEach(row => {
      html += '<tr>';
      row.cells.forEach(cell => {
        html += `<td>${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    
    return html;
  };

  const loadMarkdown = async (downloadUrl) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Failed to fetch content');
      const text = await response.text();
      const parsed = parseMarkdown(text);
      setContent(parsed);
    } catch (err) {
      setError(err.message);
      setContent('');
    } finally {
      setLoading(false);
    }
  };

  const loadRawMarkdown = (rawText) => {
    const parsed = parseMarkdown(rawText);
    setContent(parsed);
  };

  const clearContent = () => {
    setContent('');
    setError(null);
  };

  return {
    content,
    loading,
    error,
    loadMarkdown,
    loadRawMarkdown,
    clearContent,
  };
};

export default useMarkdown;
