import './FeedbackBox.css';

const FeedbackBox = ({ type, header, text, extra }) => {
  return (
    <div className={`feedback-box ${type} animate-slideIn`}>
      <div className={`feedback-header ${type}`}>
        {header}
      </div>
      <div className="feedback-text">
        {text}
      </div>
      {extra && (
        <div className={type === 'success' ? 'feedback-explanation' : 'feedback-suggestion'}>
          {type === 'error' && extra.startsWith('Try:') ? (
            <>
              <strong>Suggestion:</strong> {extra.substring(4)}
            </>
          ) : type === 'error' ? (
            <>
              <strong>Tip:</strong> {extra}
            </>
          ) : (
            extra
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackBox;

