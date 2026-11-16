import { Exam } from './content'
export const exam: Exam = {
  id: 'itds120-mock',
  minutes: 60,
  topics: ['Variables', 'Conditions', 'Loops', 'Functions', 'Lists'],
}
export const questions = [
  ['What is the value of x after x = 3; x += 4?', '7', '34', '3', '4'],
  [
    'Which expression produces a float?',
    '5 / 2',
    '5 // 2',
    '5 % 2',
    'int(2.5)',
  ],
  [
    'Which variable name is valid in Python?',
    'course_score',
    'course-score',
    '2score',
    'class',
  ],
  ['What does type("42").__name__ return?', 'str', 'int', 'float', 'bool'],
  ['Which operator checks equality?', '==', '=', '!=', ':='],
  [
    'Which expression is True for score = 50?',
    'score >= 50',
    'score > 50',
    'score < 50',
    'score != 50',
  ],
  ['What is bool([])?', 'False', 'True', 'None', '0.0'],
  [
    'Which word introduces an alternative condition?',
    'elif',
    'else if',
    'otherwise',
    'then',
  ],
  ['How many values are in range(2, 8, 2)?', '3', '2', '4', '6'],
  [
    'Which statement skips to the next iteration?',
    'continue',
    'break',
    'return',
    'pass',
  ],
  ['What is sum(range(4))?', '6', '10', '4', '3'],
  [
    'Which statement exits the nearest loop?',
    'break',
    'continue',
    'stop',
    'yield',
  ],
  [
    'What does a function return by default?',
    'None',
    '0',
    'False',
    'An empty string',
  ],
  ['Which keyword defines a function?', 'def', 'func', 'function', 'define'],
  ['For def f(x=3): return x+2, what is f()?', '5', '2', '3', 'None'],
  [
    'Which call supplies a keyword argument?',
    'round(2.345, ndigits=2)',
    'round(2.345, 2)',
    'round(2)',
    'round()',
  ],
  ['What does [4, 5, 6][-1] return?', '6', '4', '5', 'IndexError'],
  [
    'Which method adds one item to the end?',
    'append',
    'extendall',
    'push',
    'insertlast',
  ],
  ['What is len([[], [1, 2]])?', '2', '3', '0', '1'],
  ['What does [1, 2, 3][0:2] return?', '[1, 2]', '[1, 2, 3]', '[2, 3]', '[1]'],
].map(([prompt, correct, ...others], i) => {
  const pos = (i * 3 + 1) % 4
  others.splice(pos, 0, correct)
  return {
    prompt,
    choices: others,
    correct: pos,
    topic: exam.topics[Math.floor(i / 4)],
  }
})
export const topicPractice = [
  'score-update',
  'pass-mark',
  'loop-count',
  'double-value',
  'index-list',
]
