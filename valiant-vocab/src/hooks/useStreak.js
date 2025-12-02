import { useState, useEffect } from 'react';
import { getDateString } from '../utils/wordUtils';

const STORAGE_KEY = 'valiantVocabState';

export const useStreak = () => {
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [todayCompleted, setTodayCompleted] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStreak(parsed.streak || 0);
        setLastCompletedDate(parsed.lastCompletedDate || null);
        
        // Check if it's a new day
        const today = getDateString();
        setTodayCompleted(parsed.lastCompletedDate === today);
      } catch (e) {
        console.error('Failed to parse saved state:', e);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      streak,
      lastCompletedDate,
    }));
  }, [streak, lastCompletedDate]);

  const incrementStreak = () => {
    const today = getDateString();
    
    if (todayCompleted) {
      return; // Already completed today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    // Check if streak should continue or reset
    if (lastCompletedDate === yesterdayString || streak === 0) {
      setStreak(prev => prev + 1);
    } else if (lastCompletedDate !== today) {
      setStreak(1);
    }

    setLastCompletedDate(today);
    setTodayCompleted(true);
  };

  return {
    streak,
    todayCompleted,
    incrementStreak
  };
};

