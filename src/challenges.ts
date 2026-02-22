export interface Challenge {
  id: string;
  type: 'text_completion' | 'classification' | 'reasoning';
  prompt: string;
  correct_answer: string;
  expected_format: 'single_word' | 'sentence' | 'number';
  difficulty: 1 | 2 | 3;
}

export const challengeBank: Omit<Challenge, 'id'>[] = [
  // Easy math challenges (difficulty 1)
  { type: 'reasoning', prompt: 'What is 5 + 3?', correct_answer: '8', expected_format: 'number', difficulty: 1 },
  { type: 'reasoning', prompt: 'What is 10 - 4?', correct_answer: '6', expected_format: 'number', difficulty: 1 },
  { type: 'reasoning', prompt: 'What is 2 × 6?', correct_answer: '12', expected_format: 'number', difficulty: 1 },
  { type: 'reasoning', prompt: 'What is 20 ÷ 4?', correct_answer: '5', expected_format: 'number', difficulty: 1 },
  { type: 'reasoning', prompt: 'What is 15 + 15?', correct_answer: '30', expected_format: 'number', difficulty: 1 },

  // Medium math challenges (difficulty 2)
  { type: 'reasoning', prompt: 'What is 15% of 200?', correct_answer: '30', expected_format: 'number', difficulty: 2 },
  { type: 'reasoning', prompt: 'What is 25% of 80?', correct_answer: '20', expected_format: 'number', difficulty: 2 },
  { type: 'reasoning', prompt: 'What is 12 × 12?', correct_answer: '144', expected_format: 'number', difficulty: 2 },
  { type: 'reasoning', prompt: 'What comes next: 2, 4, 8, 16, ___', correct_answer: '32', expected_format: 'number', difficulty: 2 },
  { type: 'reasoning', prompt: 'What comes next: 5, 10, 15, 20, ___', correct_answer: '25', expected_format: 'number', difficulty: 2 },

  // Hard math challenges (difficulty 3)
  { type: 'reasoning', prompt: 'What is the square root of 169?', correct_answer: '13', expected_format: 'number', difficulty: 3 },
  { type: 'reasoning', prompt: 'What is 17 × 23?', correct_answer: '391', expected_format: 'number', difficulty: 3 },
  { type: 'reasoning', prompt: 'What comes next: 1, 1, 2, 3, 5, 8, ___', correct_answer: '13', expected_format: 'number', difficulty: 3 },
  { type: 'reasoning', prompt: 'If a train travels 120 km in 2 hours, what is its speed in km/h?', correct_answer: '60', expected_format: 'number', difficulty: 3 },

  // Geography - Easy (difficulty 1)
  { type: 'text_completion', prompt: 'What is the capital of France?', correct_answer: 'Paris', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is the capital of Japan?', correct_answer: 'Tokyo', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is the capital of Italy?', correct_answer: 'Rome', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is the capital of Spain?', correct_answer: 'Madrid', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is the capital of Germany?', correct_answer: 'Berlin', expected_format: 'single_word', difficulty: 1 },

  // Geography - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What is the capital of Australia?', correct_answer: 'Canberra', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the capital of Brazil?', correct_answer: 'Brasilia', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the capital of Canada?', correct_answer: 'Ottawa', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the largest ocean on Earth?', correct_answer: 'Pacific', expected_format: 'single_word', difficulty: 2 },

  // Geography - Hard (difficulty 3)
  { type: 'text_completion', prompt: 'What is the capital of Kazakhstan?', correct_answer: 'Astana', expected_format: 'single_word', difficulty: 3 },
  { type: 'text_completion', prompt: 'What is the capital of Myanmar?', correct_answer: 'Naypyidaw', expected_format: 'single_word', difficulty: 3 },

  // Language/Vocabulary - Easy (difficulty 1)
  { type: 'classification', prompt: 'What is the opposite of hot?', correct_answer: 'cold', expected_format: 'single_word', difficulty: 1 },
  { type: 'classification', prompt: 'What is the opposite of big?', correct_answer: 'small', expected_format: 'single_word', difficulty: 1 },
  { type: 'classification', prompt: 'What is the opposite of happy?', correct_answer: 'sad', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'Translate to French: Hello', correct_answer: 'Bonjour', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'Translate to Spanish: Thank you', correct_answer: 'Gracias', expected_format: 'single_word', difficulty: 1 },

  // Language - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'Translate to French: Goodbye', correct_answer: 'Au revoir', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'Translate to German: Good morning', correct_answer: 'Guten Morgen', expected_format: 'single_word', difficulty: 2 },
  { type: 'classification', prompt: 'What is a synonym for "happy"?', correct_answer: 'joyful', expected_format: 'single_word', difficulty: 2 },
  { type: 'classification', prompt: 'What is a synonym for "quick"?', correct_answer: 'fast', expected_format: 'single_word', difficulty: 2 },

  // Science - Easy (difficulty 1)
  { type: 'text_completion', prompt: 'What gas do plants absorb from the atmosphere?', correct_answer: 'carbon dioxide', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is H2O commonly known as?', correct_answer: 'water', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'How many legs does a spider have?', correct_answer: '8', expected_format: 'number', difficulty: 1 },
  { type: 'text_completion', prompt: 'What planet is closest to the Sun?', correct_answer: 'Mercury', expected_format: 'single_word', difficulty: 1 },

  // Science - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What is the speed of light in vacuum (in km/s, rounded)?', correct_answer: '300000', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the chemical symbol for gold?', correct_answer: 'Au', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'How many bones are in the adult human body?', correct_answer: '206', expected_format: 'number', difficulty: 2 },
  { type: 'reasoning', prompt: 'What is the boiling point of water at sea level in Celsius?', correct_answer: '100', expected_format: 'number', difficulty: 2 },

  // Science - Hard (difficulty 3)
  { type: 'text_completion', prompt: 'What is the atomic number of carbon?', correct_answer: '6', expected_format: 'number', difficulty: 3 },
  { type: 'reasoning', prompt: 'How many chromosomes do humans have?', correct_answer: '46', expected_format: 'number', difficulty: 3 },

  // General Knowledge - Easy (difficulty 1)
  { type: 'classification', prompt: 'Is a tomato a fruit or vegetable botanically?', correct_answer: 'fruit', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What animal is known as the "King of the Jungle"?', correct_answer: 'lion', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'How many days are in a leap year?', correct_answer: '366', expected_format: 'number', difficulty: 1 },
  { type: 'text_completion', prompt: 'How many continents are there?', correct_answer: '7', expected_format: 'number', difficulty: 1 },

  // General Knowledge - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'In what year did World War II end?', correct_answer: '1945', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'Who painted the Mona Lisa?', correct_answer: 'Leonardo da Vinci', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the smallest country in the world?', correct_answer: 'Vatican', expected_format: 'single_word', difficulty: 2 },

  // General Knowledge - Hard (difficulty 3)
  { type: 'text_completion', prompt: 'In what year did the first moon landing occur?', correct_answer: '1969', expected_format: 'number', difficulty: 3 },
  { type: 'reasoning', prompt: 'How many time zones does Russia span?', correct_answer: '11', expected_format: 'number', difficulty: 3 },

  // Logic puzzles (difficulty 2-3)
  { type: 'reasoning', prompt: 'If all roses are flowers and some flowers fade quickly, can we conclude all roses fade quickly? Answer yes or no.', correct_answer: 'no', expected_format: 'single_word', difficulty: 2 },
  { type: 'reasoning', prompt: 'A bat and ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost in cents?', correct_answer: '5', expected_format: 'number', difficulty: 3 },
  { type: 'reasoning', prompt: 'If 5 machines take 5 minutes to make 5 widgets, how many minutes would it take 100 machines to make 100 widgets?', correct_answer: '5', expected_format: 'number', difficulty: 3 },
];

// Validate we have 50+ challenges
if (challengeBank.length < 50) {
  throw new Error(`Challenge bank must have at least 50 challenges, found ${challengeBank.length}`);
}
