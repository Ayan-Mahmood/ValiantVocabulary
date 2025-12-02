import { useState, useEffect } from 'react';
import StreakBadge from './components/StreakBadge';
import WordCard from './components/WordCard';
import { useStreak } from './hooks/useStreak';
import { getWordOfTheDay } from './utils/wordUtils';
import './App.css';

function App() {
  const [wordData, setWordData] = useState(null);
  const { streak, todayCompleted, incrementStreak } = useStreak();

  useEffect(() => {
    // Load word of the day
    const word = getWordOfTheDay();
    setWordData(word);
  }, []);

  const handleCorrectSubmit = () => {
    if (!todayCompleted) {
      incrementStreak();
      return true; // Streak was incremented
    }
    return false; // Already completed today
  };

  if (!wordData) {
    return (
      <div className="app-container">
        <div className="loading-screen">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <StreakBadge streak={streak} />
      <WordCard wordData={wordData} onCorrectSubmit={handleCorrectSubmit} />
    </div>
  );
}

export default App;

