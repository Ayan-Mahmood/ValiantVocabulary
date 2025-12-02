const API_URL = 'https://api.openai.com/v1/chat/completions';

export const validateSentenceWithAI = async (sentence, word, partOfSpeech, definition) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your-api-key-here') {
    throw new Error('No API key configured');
  }
  
  const prompt = `You are a vocabulary learning assistant helping students practice using the word "${word}".

Word: "${word}" (${partOfSpeech})
Definition: ${definition}

Student's sentence: "${sentence}"

Your task: Evaluate if the student used "${word}" CORRECTLY in their sentence. The goal is to practice this specific word, so focus on whether they understood and applied its meaning properly.

IMPORTANT GUIDELINES:
- If "${word}" is used correctly according to its definition, mark it as CORRECT
- Do NOT suggest using a different word - the student MUST practice "${word}"
- Only mark as incorrect if: wrong meaning, wrong grammar, or doesn't make sense
- Be encouraging when correct, and provide specific help when incorrect

Respond in JSON format:
{
    "correct": true/false,
    "feedback": "One clear sentence about their usage of '${word}'",
    "explanation": "Optional: Why their usage works well (if correct)",
    "suggestion": "Optional: How to fix the usage of '${word}' (if incorrect)"
}

Remember: The student is learning to use "${word}" - validate their usage of this specific word, don't suggest alternatives.`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a vocabulary learning assistant. Your role is to validate if students use specific vocabulary words correctly, NOT to suggest alternative words. Focus on encouraging correct usage and helping fix incorrect usage of the target word.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 200
    })
  });
  
  if (!response.ok) {
    throw new Error('API request failed');
  }
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Parse JSON response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  throw new Error('Invalid response format');
};

export const fallbackValidation = (sentence, word) => {
  // Basic checks
  const hasWord = sentence.toLowerCase().includes(word.toLowerCase());
  const isComplete = sentence.length > 20 && /[.!?]$/.test(sentence);
  const hasSubjectVerb = sentence.split(' ').length >= 5;
  
  if (hasWord && isComplete && hasSubjectVerb) {
    return {
      correct: true,
      feedback: 'Your sentence looks good! It includes the word and forms a complete thought.'
    };
  } else {
    return {
      correct: false,
      feedback: 'Please ensure your sentence is complete, includes the word correctly, and makes sense.'
    };
  }
};

