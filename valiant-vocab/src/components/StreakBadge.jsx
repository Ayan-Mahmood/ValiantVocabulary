import './StreakBadge.css';

const StreakBadge = ({ streak }) => {
  return (
    <div className="streak-badge" aria-label={`Current streak: ${streak} days`}>
      <span className="streak-icon">🔥</span>
      <span className="streak-count">{streak}</span>
    </div>
  );
};

export default StreakBadge;

