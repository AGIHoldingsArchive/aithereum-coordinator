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

  // AI & Machine Learning - Easy (difficulty 1)
  { type: 'text_completion', prompt: 'What does LLM stand for in AI?', correct_answer: 'Large Language Model', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'Which company created GPT-4?', correct_answer: 'OpenAI', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'Which company created Claude?', correct_answer: 'Anthropic', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does AI stand for?', correct_answer: 'Artificial Intelligence', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'Which company created Gemini?', correct_answer: 'Google', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is the process of teaching an AI model called?', correct_answer: 'training', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'Which company acquired DeepMind?', correct_answer: 'Google', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does ML stand for?', correct_answer: 'Machine Learning', expected_format: 'sentence', difficulty: 1 },

  // AI & Machine Learning - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What architecture powers most modern LLMs?', correct_answer: 'Transformer', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does GPT stand for?', correct_answer: 'Generative Pre-trained Transformer', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the name of the attention mechanism in transformers?', correct_answer: 'self-attention', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What year was the original Transformer paper published?', correct_answer: '2017', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does CNN stand for in deep learning?', correct_answer: 'Convolutional Neural Network', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company created AlphaGo?', correct_answer: 'DeepMind', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does BERT stand for?', correct_answer: 'Bidirectional Encoder Representations from Transformers', expected_format: 'sentence', difficulty: 2 },

  // AI & Machine Learning - Hard (difficulty 3)
  { type: 'text_completion', prompt: 'What is the name of the paper that introduced the Transformer architecture?', correct_answer: 'Attention is All You Need', expected_format: 'sentence', difficulty: 3 },
  { type: 'text_completion', prompt: 'What technique prevents overfitting by randomly dropping neurons during training?', correct_answer: 'dropout', expected_format: 'single_word', difficulty: 3 },
  { type: 'text_completion', prompt: 'What algorithm is commonly used to train neural networks?', correct_answer: 'backpropagation', expected_format: 'single_word', difficulty: 3 },
  { type: 'reasoning', prompt: 'What year did AlphaGo defeat Lee Sedol?', correct_answer: '2016', expected_format: 'number', difficulty: 3 },

  // Cryptocurrency & Blockchain - Easy (difficulty 1)
  { type: 'text_completion', prompt: 'What is the first and most famous cryptocurrency?', correct_answer: 'Bitcoin', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What blockchain is Base built on?', correct_answer: 'Ethereum', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is a decentralized application called?', correct_answer: 'dApp', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What cryptocurrency has the ticker symbol ETH?', correct_answer: 'Ethereum', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is the process of creating new Bitcoin called?', correct_answer: 'mining', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What year was Bitcoin created?', correct_answer: '2009', expected_format: 'number', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is the pseudonymous creator of Bitcoin called?', correct_answer: 'Satoshi Nakamoto', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is a self-executing contract on a blockchain called?', correct_answer: 'smart contract', expected_format: 'sentence', difficulty: 1 },

  // Cryptocurrency & Blockchain - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What consensus mechanism does Bitcoin use?', correct_answer: 'Proof of Work', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What consensus mechanism does Ethereum currently use?', correct_answer: 'Proof of Stake', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the maximum supply of Bitcoin?', correct_answer: '21000000', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What Layer 2 scaling solution uses rollups on Ethereum?', correct_answer: 'Optimism', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company founded Base blockchain?', correct_answer: 'Coinbase', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What year did Ethereum launch?', correct_answer: '2015', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the native cryptocurrency of Solana?', correct_answer: 'SOL', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does DeFi stand for?', correct_answer: 'Decentralized Finance', expected_format: 'sentence', difficulty: 2 },

  // Cryptocurrency & Blockchain - Hard (difficulty 3)
  { type: 'text_completion', prompt: 'What is the name of the Ethereum upgrade that switched to Proof of Stake?', correct_answer: 'The Merge', expected_format: 'sentence', difficulty: 3 },
  { type: 'text_completion', prompt: 'What is the EVM?', correct_answer: 'Ethereum Virtual Machine', expected_format: 'sentence', difficulty: 3 },
  { type: 'reasoning', prompt: 'How many confirmations are typically recommended for Bitcoin transactions?', correct_answer: '6', expected_format: 'number', difficulty: 3 },
  { type: 'text_completion', prompt: 'What programming language are Ethereum smart contracts primarily written in?', correct_answer: 'Solidity', expected_format: 'single_word', difficulty: 3 },
  { type: 'text_completion', prompt: 'What is the block time for Bitcoin in minutes?', correct_answer: '10', expected_format: 'number', difficulty: 3 },

  // Tech Companies & History - Easy (difficulty 1)
  { type: 'text_completion', prompt: 'Who founded Apple Computer?', correct_answer: 'Steve Jobs', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'Who founded Microsoft?', correct_answer: 'Bill Gates', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'Who founded Amazon?', correct_answer: 'Jeff Bezos', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'Who founded Facebook (Meta)?', correct_answer: 'Mark Zuckerberg', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'Who founded Tesla?', correct_answer: 'Elon Musk', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What company created the iPhone?', correct_answer: 'Apple', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What search engine is most popular?', correct_answer: 'Google', expected_format: 'single_word', difficulty: 1 },

  // Tech Companies & History - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What year was Apple founded?', correct_answer: '1976', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What year was Google founded?', correct_answer: '1998', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company acquired GitHub?', correct_answer: 'Microsoft', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company acquired WhatsApp?', correct_answer: 'Facebook', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What was the first iPhone released year?', correct_answer: '2007', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does IBM stand for?', correct_answer: 'International Business Machines', expected_format: 'sentence', difficulty: 2 },

  // Tech Companies & History - Hard (difficulty 3)
  { type: 'text_completion', prompt: 'What company was originally called BackRub?', correct_answer: 'Google', expected_format: 'single_word', difficulty: 3 },
  { type: 'text_completion', prompt: 'What year was the World Wide Web invented?', correct_answer: '1989', expected_format: 'number', difficulty: 3 },
  { type: 'text_completion', prompt: 'Who invented the World Wide Web?', correct_answer: 'Tim Berners-Lee', expected_format: 'sentence', difficulty: 3 },
  { type: 'text_completion', prompt: 'What year did Microsoft release Windows 95?', correct_answer: '1995', expected_format: 'number', difficulty: 3 },

  // Programming & Computer Science - Easy (difficulty 1)
  { type: 'text_completion', prompt: 'What programming language is known for AI and data science?', correct_answer: 'Python', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does HTML stand for?', correct_answer: 'HyperText Markup Language', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does CSS stand for?', correct_answer: 'Cascading Style Sheets', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does API stand for?', correct_answer: 'Application Programming Interface', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What language runs in web browsers?', correct_answer: 'JavaScript', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does SQL stand for?', correct_answer: 'Structured Query Language', expected_format: 'sentence', difficulty: 1 },

  // Programming & Computer Science - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What does JSON stand for?', correct_answer: 'JavaScript Object Notation', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What version control system does GitHub use?', correct_answer: 'Git', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What language is used for iOS app development?', correct_answer: 'Swift', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does REST stand for in APIs?', correct_answer: 'Representational State Transfer', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company created the Rust programming language?', correct_answer: 'Mozilla', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does NPM stand for?', correct_answer: 'Node Package Manager', expected_format: 'sentence', difficulty: 2 },

  // Programming & Computer Science - Hard (difficulty 3)
  { type: 'text_completion', prompt: 'What sorting algorithm has O(n log n) average time complexity?', correct_answer: 'quicksort', expected_format: 'single_word', difficulty: 3 },
  { type: 'text_completion', prompt: 'What does SOLID stand for in software design?', correct_answer: 'Single responsibility Open-closed Liskov substitution Interface segregation Dependency inversion', expected_format: 'sentence', difficulty: 3 },
  { type: 'reasoning', prompt: 'What is the time complexity of binary search?', correct_answer: 'O(log n)', expected_format: 'sentence', difficulty: 3 },
  { type: 'text_completion', prompt: 'What year was the Python programming language first released?', correct_answer: '1991', expected_format: 'number', difficulty: 3 },

  // More Logic Puzzles (difficulty 2-3)
  { type: 'reasoning', prompt: 'You have 3 boxes. One contains only apples, one only oranges, one both. All are mislabeled. Pick one fruit from one box to correctly label all. How many boxes must you check?', correct_answer: '1', expected_format: 'number', difficulty: 3 },
  { type: 'reasoning', prompt: 'A farmer has 17 sheep. All but 9 die. How many are left?', correct_answer: '9', expected_format: 'number', difficulty: 2 },
  { type: 'reasoning', prompt: 'If you overtake the person in second place, what position are you in?', correct_answer: 'second', expected_format: 'single_word', difficulty: 2 },
  { type: 'reasoning', prompt: 'What is the next number in the sequence: 1, 4, 9, 16, 25, ___', correct_answer: '36', expected_format: 'number', difficulty: 2 },
  { type: 'reasoning', prompt: 'How many sides does a hexagon have?', correct_answer: '6', expected_format: 'number', difficulty: 1 },
  { type: 'reasoning', prompt: 'If today is Monday, what day is it 100 days from now?', correct_answer: 'Thursday', expected_format: 'single_word', difficulty: 3 },

  // NEW: More AI & Tech Challenges - Easy (difficulty 1)
  { type: 'text_completion', prompt: 'Which company created Claude AI?', correct_answer: 'Anthropic', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does LLM stand for?', correct_answer: 'Large Language Model', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does GPU stand for?', correct_answer: 'Graphics Processing Unit', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does URL stand for?', correct_answer: 'Uniform Resource Locator', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does RAM stand for?', correct_answer: 'Random Access Memory', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does CPU stand for?', correct_answer: 'Central Processing Unit', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'Which company makes Windows?', correct_answer: 'Microsoft', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'Which company makes macOS?', correct_answer: 'Apple', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does PDF stand for?', correct_answer: 'Portable Document Format', expected_format: 'sentence', difficulty: 1 },

  // NEW: More Crypto Challenges - Easy (difficulty 1)
  { type: 'text_completion', prompt: 'What blockchain is Base built on?', correct_answer: 'Ethereum', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What year was Bitcoin created?', correct_answer: '2009', expected_format: 'number', difficulty: 1 },
  { type: 'text_completion', prompt: 'Who created Bitcoin?', correct_answer: 'Satoshi Nakamoto', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is the native token of Ethereum?', correct_answer: 'ETH', expected_format: 'single_word', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does NFT stand for?', correct_answer: 'Non-Fungible Token', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does DAO stand for in crypto?', correct_answer: 'Decentralized Autonomous Organization', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What is a cryptocurrency wallet used for?', correct_answer: 'storing keys', expected_format: 'sentence', difficulty: 1 },
  { type: 'text_completion', prompt: 'What does ICO stand for?', correct_answer: 'Initial Coin Offering', expected_format: 'sentence', difficulty: 1 },

  // NEW: Tech History - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What year was Ethereum launched?', correct_answer: '2015', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What year was YouTube founded?', correct_answer: '2005', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What year was Twitter (X) founded?', correct_answer: '2006', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company created React?', correct_answer: 'Facebook', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company created Kubernetes?', correct_answer: 'Google', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does VPN stand for?', correct_answer: 'Virtual Private Network', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What year was Linux first released?', correct_answer: '1991', expected_format: 'number', difficulty: 2 },
  { type: 'text_completion', prompt: 'Who created Linux?', correct_answer: 'Linus Torvalds', expected_format: 'sentence', difficulty: 2 },

  // NEW: AI & Machine Learning - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What does NLP stand for in AI?', correct_answer: 'Natural Language Processing', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the process of adjusting model weights called?', correct_answer: 'optimization', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does GAN stand for?', correct_answer: 'Generative Adversarial Network', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company created TensorFlow?', correct_answer: 'Google', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What company created PyTorch?', correct_answer: 'Facebook', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does AGI stand for?', correct_answer: 'Artificial General Intelligence', expected_format: 'sentence', difficulty: 2 },

  // NEW: Crypto & Blockchain - Medium (difficulty 2)
  { type: 'text_completion', prompt: 'What is a crypto token standard on Ethereum called?', correct_answer: 'ERC-20', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the NFT token standard on Ethereum?', correct_answer: 'ERC-721', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the smallest unit of Bitcoin called?', correct_answer: 'satoshi', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What Layer 2 network is Base an example of?', correct_answer: 'Optimistic Rollup', expected_format: 'sentence', difficulty: 2 },
  { type: 'text_completion', prompt: 'What is the native token of Binance Smart Chain?', correct_answer: 'BNB', expected_format: 'single_word', difficulty: 2 },
  { type: 'text_completion', prompt: 'What does AMM stand for in DeFi?', correct_answer: 'Automated Market Maker', expected_format: 'sentence', difficulty: 2 },

  // NEW: Advanced AI & Tech - Hard (difficulty 3)
  { type: 'text_completion', prompt: 'What activation function is commonly used in modern neural networks?', correct_answer: 'ReLU', expected_format: 'single_word', difficulty: 3 },
  { type: 'text_completion', prompt: 'What year was the first iPhone released?', correct_answer: '2007', expected_format: 'number', difficulty: 3 },
  { type: 'reasoning', prompt: 'What is the maximum block size of Bitcoin in megabytes?', correct_answer: '1', expected_format: 'number', difficulty: 3 },
  { type: 'text_completion', prompt: 'What consensus algorithm does Bitcoin use?', correct_answer: 'Proof of Work', expected_format: 'sentence', difficulty: 3 },
  { type: 'text_completion', prompt: 'What does ASIC stand for in crypto mining?', correct_answer: 'Application-Specific Integrated Circuit', expected_format: 'sentence', difficulty: 3 },
  { type: 'text_completion', prompt: 'What cryptographic hash function does Bitcoin use?', correct_answer: 'SHA-256', expected_format: 'single_word', difficulty: 3 },
  { type: 'text_completion', prompt: 'What scaling solution uses zero-knowledge proofs?', correct_answer: 'zk-rollup', expected_format: 'single_word', difficulty: 3 },
  { type: 'reasoning', prompt: 'How many seconds is the Ethereum block time?', correct_answer: '12', expected_format: 'number', difficulty: 3 },
  { type: 'text_completion', prompt: 'What does EIP stand for in Ethereum?', correct_answer: 'Ethereum Improvement Proposal', expected_format: 'sentence', difficulty: 3 },
  { type: 'text_completion', prompt: 'What year did ChatGPT launch?', correct_answer: '2022', expected_format: 'number', difficulty: 3 },
];

// Validate we have 200+ challenges
if (challengeBank.length < 200) {
  throw new Error(`Challenge bank must have at least 200 challenges, found ${challengeBank.length}`);
}
