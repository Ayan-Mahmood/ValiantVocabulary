import { useState } from 'react';
import { containsWord, getSuggestionSentence } from '../utils/wordUtils';
import { validateSentenceWithAI, fallbackValidation } from '../utils/apiService';
import ContrastTip from './ContrastTip';
import FeedbackBox from './FeedbackBox';
import './WordCard.css';

const WordCard = ({ wordData, onCorrectSubmit }) => {
  const [sentence, setSentence] = useState('');
  const [preCheckMessage, setPreCheckMessage] = useState('');
  const [preCheckType, setPreCheckType] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSentence(value);

    // Pre-check logic
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      setPreCheckMessage('');
      setPreCheckType('');
    } else if (trimmed.length < 10) {
      setPreCheckMessage('💡 Try writing a more complete sentence');
      setPreCheckType('info');
    } else if (!containsWord(trimmed, wordData.word)) {
      setPreCheckMessage(`⚠️ Remember to include the word "${wordData.word}"`);
      setPreCheckType('warning');
    } else {
      setPreCheckMessage('');
      setPreCheckType('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmed = sentence.trim();
    setFeedback(null);

    // Basic validation
    if (trimmed.length === 0) {
      setFeedback({
        type: 'error',
        header: '❌ Please write a sentence',
        text: 'You need to type something before submitting.'
      });
      return;
    }

    if (trimmed.length < 10) {
      setFeedback({
        type: 'error',
        header: '❌ Sentence too short',
        text: 'Please write a more complete sentence (at least a few words).'
      });
      return;
    }

    if (!containsWord(trimmed, wordData.word)) {
      setFeedback({
        type: 'error',
        header: `❌ Missing word "${wordData.word}"`,
        text: `Your sentence must include the word "${wordData.word}" or a variation of it.`,
        extra: `Try: ${getSuggestionSentence(wordData.word)}`
      });
      return;
    }

    // AI validation
    setIsLoading(true);
    
    try {
      const result = await validateSentenceWithAI(
        trimmed,
        wordData.word,
        wordData.partOfSpeech,
        wordData.definition
      );

      if (result.correct) {
        const streakIncremented = onCorrectSubmit();
        
        setFeedback({
          type: 'success',
          header: streakIncremented 
            ? `✓ Correct! +1 streak` 
            : '✓ Great sentence!',
          text: result.feedback,
          extra: result.explanation
        });
        setSentence('');
        setPreCheckMessage('');
      } else {
        setFeedback({
          type: 'error',
          header: '❌ Not quite right',
          text: result.feedback,
          extra: result.suggestion
        });
      }
    } catch (error) {
      console.error('Validation error:', error);

      // Fallback validation
      const fallbackResult = fallbackValidation(trimmed, wordData.word);
      
      if (fallbackResult.correct) {
        const streakIncremented = onCorrectSubmit();
        
        setFeedback({
          type: 'success',
          header: streakIncremented 
            ? `✓ Correct! +1 streak` 
            : '✓ Great sentence!',
          text: fallbackResult.feedback
        });
        setSentence('');
        setPreCheckMessage('');
      } else {
        setFeedback({
          type: 'error',
          header: '❌ Could not validate',
          text: 'AI validation unavailable. Please ensure the word is used correctly in context.',
          extra: 'Add your OpenAI API key to .env file (VITE_OPENAI_API_KEY) for detailed feedback.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="word-card">
      <h1 className="card-title">Word of the Day</h1>
      
      <div className="word-section">
        <h2 className="word">{wordData.word}</h2>
        <span className="part-of-speech">{wordData.partOfSpeech}</span>
      </div>
      
      <p className="definition">{wordData.definition}</p>
      
      <ContrastTip tip={wordData.contrastTip} />

      <form onSubmit={handleSubmit} className="input-section">
        <label htmlFor="sentenceInput" className="input-label">
          Write a sentence using this word:
        </label>
        <input
          type="text"
          id="sentenceInput"
          className="sentence-input"
          placeholder="Type your sentence and press Enter..."
          value={sentence}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          autoFocus
          disabled={isLoading}
        />
        <div className={`pre-check-message ${preCheckType}`}>
          {preCheckMessage}
        </div>
      </form>

      <div className="feedback-section">
        {isLoading && (
          <div className="loading">Analyzing your sentence...</div>
        )}
        {feedback && !isLoading && (
          <FeedbackBox
            type={feedback.type}
            header={feedback.header}
            text={feedback.text}
            extra={feedback.extra}
          />
        )}
      </div>
    </div>
  );
};

export default WordCard;

