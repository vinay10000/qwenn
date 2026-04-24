import { useState, useEffect, useMemo } from 'react';

const TableOfContents = ({ content, currentLesson }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // Extract headings from content
  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3');
    
    const extracted = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setHeadings(extracted);

    // Update the content with IDs
    const contentElement = document.querySelector('.markdown-content');
    if (contentElement) {
      contentElement.innerHTML = doc.body.innerHTML;
    }
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const element = document.querySelector('.content-scroll');
      if (!element) return;

      const scrollTop = element.scrollTop + 100; // Offset for better UX

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = document.getElementById(headings[i].id);
        if (heading && heading.offsetTop <= scrollTop) {
          setActiveId(headings[i].id);
          break;
        }
      }
    };

    const element = document.querySelector('.content-scroll');
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    const scrollContainer = document.querySelector('.content-scroll');
    
    if (element && scrollContainer) {
      const offset = element.offsetTop - 80;
      scrollContainer.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  if (!currentLesson || headings.length === 0) {
    return (
      <div className="table-of-contents empty">
        <h3 className="toc-title">On This Page</h3>
        <p className="toc-empty">No headings available</p>
      </div>
    );
  }

  return (
    <div className="table-of-contents">
      <h3 className="toc-title">On This Page</h3>
      <nav className="toc-nav">
        <ul className="toc-list">
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              className={`toc-item level-${heading.level}`}
              style={{ '--indent-level': heading.level - 1 }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`toc-link ${activeId === heading.id ? 'active' : ''}`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Lesson Info */}
      <div className="lesson-info">
        <div className="info-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Estimated reading time</span>
        </div>
        <div className="info-value">
          {Math.max(1, Math.ceil(content?.length / 1000 || 0))} min
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
