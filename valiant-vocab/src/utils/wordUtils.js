export const WORD_DATABASE = [
  {
    word: "ephemeral",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time; transient.",
    contrastTip: "ephemeral ≠ eternal (opposite meanings)"
  },
  {
    word: "ubiquitous",
    partOfSpeech: "adjective",
    definition: "Present, appearing, or found everywhere.",
    contrastTip: "ubiquitous ≠ rare (ubiquitous means common)"
  },
  {
    word: "pragmatic",
    partOfSpeech: "adjective",
    definition: "Dealing with things sensibly and realistically in a practical way.",
    contrastTip: "pragmatic ≠ idealistic (focus on practical vs. theoretical)"
  },
  {
    word: "lucid",
    partOfSpeech: "adjective",
    definition: "Expressed clearly; easy to understand.",
    contrastTip: "lucid ≠ obscure (clear vs. unclear)"
  },
  {
    word: "verbose",
    partOfSpeech: "adjective",
    definition: "Using or expressed in more words than are needed.",
    contrastTip: "verbose ≠ concise (wordy vs. brief)"
  },
  {
    word: "tenuous",
    partOfSpeech: "adjective",
    definition: "Very weak or slight; having little substance or strength.",
    contrastTip: "tenuous ≠ solid (weak vs. strong connection)"
  },
  {
    word: "candor",
    partOfSpeech: "noun",
    definition: "The quality of being open and honest in expression; frankness.",
    contrastTip: "candor ≠ deception (honesty vs. dishonesty)"
  },
  {
    word: "abstruse",
    partOfSpeech: "adjective",
    definition: "Difficult to understand; obscure.",
    contrastTip: "abstruse ≠ simple (complexity vs. clarity)"
  },
  {
    word: "ameliorate",
    partOfSpeech: "verb",
    definition: "To make something bad or unsatisfactory better.",
    contrastTip: "ameliorate ≠ worsen (improve vs. deteriorate)"
  },
  {
    word: "perfunctory",
    partOfSpeech: "adjective",
    definition: "Carried out with minimal effort or reflection; routine and superficial.",
    contrastTip: "perfunctory ≠ thorough (careless vs. careful)"
  }
];

export const getWordOfTheDay = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % WORD_DATABASE.length;
  return WORD_DATABASE[index];
};

export const getDateString = () => {
  return new Date().toISOString().split('T')[0];
};

export const containsWord = (sentence, word) => {
  const lowerSentence = sentence.toLowerCase();
  const lowerWord = word.toLowerCase();
  
  const regex = new RegExp('\\b' + lowerWord + '(s|ed|ing|ly|ness)?\\b', 'i');
  return regex.test(lowerSentence);
};

export const getSuggestionSentence = (word) => {
  const suggestions = {
    'ephemeral': 'The beauty of cherry blossoms is ephemeral, lasting only a few weeks each spring.',
    'ubiquitous': 'Smartphones have become ubiquitous in modern society.',
    'pragmatic': 'She took a pragmatic approach to solving the budget crisis.',
    'lucid': 'The professor gave a lucid explanation of quantum physics.',
    'verbose': 'His verbose writing style made the report difficult to read.',
    'tenuous': 'The connection between the two events seems tenuous at best.',
    'candor': 'I appreciate your candor in sharing your honest opinion.',
    'abstruse': 'The philosopher\'s abstruse theories confused most readers.',
    'ameliorate': 'The new policy aims to ameliorate working conditions.',
    'perfunctory': 'He gave a perfunctory greeting without making eye contact.'
  };
  
  return suggestions[word] || `The concept of ${word} is important to understand.`;
};

