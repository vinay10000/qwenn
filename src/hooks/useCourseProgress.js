import { useState, useEffect } from 'react';

const useCourseProgress = (courseStructure) => {
  const [completionState, setCompletionState] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [recentCourses, setRecentCourses] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (!courseStructure) return;
    
    const savedState = localStorage.getItem(`progress_${courseStructure.repo}`);
    const savedCurrent = localStorage.getItem(`current_${courseStructure.repo}`);
    
    if (savedState) {
      setCompletionState(JSON.parse(savedState));
    }
    
    if (savedCurrent) {
      setCurrentLesson(JSON.parse(savedCurrent));
    }

    // Load recent courses
    const allRecent = JSON.parse(localStorage.getItem('recentCourses') || '[]');
    setRecentCourses(allRecent);
  }, [courseStructure]);

  // Save progress when it changes
  useEffect(() => {
    if (!courseStructure || Object.keys(completionState).length === 0) return;
    
    localStorage.setItem(
      `progress_${courseStructure.repo}`,
      JSON.stringify(completionState)
    );
  }, [completionState, courseStructure]);

  // Save current lesson
  useEffect(() => {
    if (!courseStructure || !currentLesson) return;
    
    localStorage.setItem(
      `current_${courseStructure.repo}`,
      JSON.stringify(currentLesson)
    );

    // Update recent courses
    const newRecent = {
      repo: courseStructure.repo,
      owner: courseStructure.owner,
      title: courseStructure.title,
      lastLesson: currentLesson.title,
      timestamp: Date.now(),
    };

    setRecentCourses(prev => {
      const filtered = prev.filter(c => c.repo !== courseStructure.repo);
      const updated = [newRecent, ...filtered].slice(0, 5);
      localStorage.setItem('recentCourses', JSON.stringify(updated));
      return updated;
    });
  }, [currentLesson, courseStructure]);

  const markComplete = (lessonId) => {
    setCompletionState(prev => ({
      ...prev,
      [lessonId]: true,
    }));
  };

  const markIncomplete = (lessonId) => {
    setCompletionState(prev => ({
      ...prev,
      [lessonId]: false,
    }));
  };

  const toggleComplete = (lessonId) => {
    setCompletionState(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const isComplete = (lessonId) => !!completionState[lessonId];

  const getProgress = () => {
    if (!courseStructure) return 0;
    
    let total = 0;
    let completed = 0;

    courseStructure.rootFiles?.forEach(file => {
      total++;
      if (completionState[file.id]) completed++;
    });

    courseStructure.chapters?.forEach(chapter => {
      chapter.modules.forEach(module => {
        total++;
        if (completionState[module.id]) completed++;
      });
    });

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const resetProgress = () => {
    if (!courseStructure) return;
    localStorage.removeItem(`progress_${courseStructure.repo}`);
    setCompletionState({});
  };

  return {
    completionState,
    currentLesson,
    recentCourses,
    markComplete,
    markIncomplete,
    toggleComplete,
    isComplete,
    getProgress,
    setCurrentLesson,
    resetProgress,
  };
};

export default useCourseProgress;
