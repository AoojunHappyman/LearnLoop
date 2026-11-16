export type ExerciseType =
  | 'CODING'
  | 'DEBUGGING'
  | 'OUTPUT_PREDICTION'
  | 'CODE_COMPLETION'
  | 'MULTIPLE_CHOICE'
  | 'SQL'
  | 'WEB'
export interface TestCase {
  input: string
  output: string
}
export interface Exercise {
  id: string
  courseId: string
  engine: 'python-pattern' | 'answer-key' | 'sql' | 'web'
  module: number
  title: string
  type: ExerciseType
  prompt: string
  starter: string
  answer: string
  tests: TestCase[]
  hint: string
  choices?: string[]
  xp: number
  difficulty: string
}
export interface Course {
  id: string
  title: string
  category: string
  description: string
  available: boolean
}
export interface Module {
  id: number
  title: string
  summary: string
}
export interface Lesson {
  module: number
  objectives: string[]
}
export interface User {
  name: string
}
export interface Submission {
  exerciseId: string
  date: string
  xp: number
}
export interface UserProgress {
  user: User | null
  submissions: Submission[]
}
export interface Achievement {
  title: string
  description: string
  earned: boolean
}
export interface Exam {
  id: string
  minutes: number
  topics: string[]
}
export interface ExamAttempt {
  answers: number[]
  deadline: number
  finished: boolean
}
export const courses: Course[] = [
  {
    id: 'itds120',
    title: 'Fundamentals of Programming',
    category: 'Programming',
    description:
      'Build your foundation in Python, one hands-on challenge at a time.',
    available: true,
  },
  {
    id: 'databases',
    title: 'Database Systems',
    category: 'Data management',
    description:
      'Explore relational data, design schemas, and write SQL queries.',
    available: false,
  },
  {
    id: 'web',
    title: 'Web Technologies',
    category: 'Web development',
    description: 'Bring the web to life with HTML, CSS, and JavaScript.',
    available: false,
  },
  {
    id: 'structures',
    title: 'Data Structures',
    category: 'Computer science',
    description: 'Organize information with trees, stacks, queues, and graphs.',
    available: false,
  },
  {
    id: 'networking',
    title: 'Networking',
    category: 'Infrastructure',
    description: 'Discover how devices exchange packets across networks.',
    available: false,
  },
]
export const modules: Module[] = [
  [
    'Introduction to Programming',
    'Use print() to send text to the console. Python reads statements from top to bottom.',
  ],
  [
    'Variables and Data Types',
    'Bind values to names and distinguish integers, strings, and floating-point numbers.',
  ],
  ['Input and Output', 'Read text with input() and format values for display.'],
  [
    'Operators and Expressions',
    'Combine numeric values using arithmetic and integer division.',
  ],
  [
    'Conditional Statements',
    'Choose a branch based on a comparison using if and else.',
  ],
  ['Loops', 'Repeat a block with for and use range() to generate integers.'],
  ['Functions', 'Define reusable steps with parameters and return values.'],
  [
    'Lists and Tuples',
    'Store ordered items and access them with zero-based indices.',
  ],
  [
    'Dictionaries and Sets',
    'Look up values by key and use sets to collect unique items.',
  ],
  ['Strings', 'Transform and slice sequences of characters.'],
  [
    'File Handling',
    'Read text safely with a context manager and a file object.',
  ],
  [
    'Programming Challenges',
    'Combine selection, iteration, and aggregation to solve a complete task.',
  ],
].map(([title, summary], i) => ({ id: i + 1, title, summary }))
function problem(
  id: string,
  module: number,
  title: string,
  type: ExerciseType,
  prompt: string,
  starter: string,
  answer: string,
  input: string,
  output: string,
  hint: string,
  choices?: string[],
): Exercise {
  return {
    id,
    courseId: 'itds120',
    engine: ['CODING', 'DEBUGGING', 'CODE_COMPLETION'].includes(type)
      ? 'python-pattern'
      : 'answer-key',
    module,
    title,
    type,
    prompt,
    starter,
    answer,
    tests: [{ input, output }],
    hint,
    choices,
    xp: module > 6 ? 50 : 25,
    difficulty: module > 6 ? 'Intermediate' : 'Beginner',
  }
}
export const exercises = [
  problem(
    'numeric-score',
    2,
    'Repair a numeric sum',
    'DEBUGGING',
    'Convert the string score to an integer before adding the bonus.',
    'print("8" + 2)',
    'print(int("8") + 2)',
    'None',
    '10',
    'Wrap the string value in int().',
  ),
  problem(
    'output-spacing',
    3,
    'Fix a course label',
    'DEBUGGING',
    'Print ITDS120 with no space between the subject and number.',
    'print("ITDS", 120)',
    'print("ITDS", 120, sep="")',
    'None',
    'ITDS120',
    'Set the sep keyword argument to an empty string.',
  ),
  problem(
    'area-expression',
    4,
    'Repair the area formula',
    'DEBUGGING',
    'The rectangle is 3 units wide and 4 units tall. Fix the area calculation.',
    'print(3 + 4)',
    'print(3 * 4)',
    'None',
    '12',
    'Area is width multiplied by height.',
  ),
  problem(
    'include-boundary',
    5,
    'Include the boundary',
    'DEBUGGING',
    'Change the comparison so age 18 meets the minimum age of 18.',
    'age = 18\nprint(age > 18)',
    'age = 18\nprint(age >= 18)',
    'None',
    'True',
    'Use an inclusive lower bound.',
  ),
  problem(
    'return-total',
    7,
    'Return the total',
    'DEBUGGING',
    'Make add return the sum to its caller.',
    'def add(a, b):\n    print(a + b)',
    'def add(a, b):\n    return a + b',
    'add(2, 5)',
    '7',
    'Replace the print call with a return statement.',
  ),
  problem(
    'last-item',
    8,
    'Repair the last index',
    'DEBUGGING',
    'Retrieve the final element without going beyond the list.',
    'items = [4, 8]\nprint(items[2])',
    'items = [4, 8]\nprint(items[-1])',
    'None',
    '8',
    'Use negative indexing to select the last item.',
  ),
  problem(
    'dict-key',
    9,
    'Repair a key lookup',
    'DEBUGGING',
    'Look up the score using the exact key stored in the dictionary.',
    'record = {"score": 9}\nprint(record["Score"])',
    'record = {"score": 9}\nprint(record["score"])',
    'None',
    '9',
    'String keys are case-sensitive.',
  ),
  problem(
    'trim-text',
    10,
    'Clean a username',
    'DEBUGGING',
    'Remove whitespace from both ends of the supplied username.',
    'name = " Kai "\nprint(name.lstrip())',
    'name = " Kai "\nprint(name.strip())',
    'None',
    'Kai',
    'strip() removes whitespace from both ends.',
  ),
  problem(
    'hello-loop',
    1,
    'Hello, LearnLoop!',
    'CODING',
    'Write a program that prints the greeting Hello, LearnLoop! exactly once. Match the punctuation and capitalization.',
    '# Print your first greeting\n',
    'print("Hello, LearnLoop!")',
    'None',
    'Hello, LearnLoop!',
    'Pass the greeting to print() inside quotes.',
  ),
  problem(
    'missing-quote',
    1,
    'Repair the greeting',
    'DEBUGGING',
    'Fix the mismatched quotation marks so the program prints Ready.',
    'print("Ready\')',
    'print("Ready")',
    'None',
    'Ready',
    'Both ends of a string use matching quotes.',
  ),
  problem(
    'score-update',
    2,
    'Update the score',
    'OUTPUT_PREDICTION',
    'Predict the final value displayed by the program.',
    'score = 7\nscore += 5\nprint(score)',
    '12',
    'None',
    '12',
    'Add five to the original seven.',
  ),
  problem(
    'type-check',
    2,
    'Name that type',
    'MULTIPLE_CHOICE',
    'Which Python type holds the value 3.14?',
    '',
    'float',
    '3.14',
    'float',
    'Fractional numbers use a floating-point representation.',
    ['int', 'str', 'float', 'bool'],
  ),
  problem(
    'campus-welcome',
    3,
    'Welcome a student',
    'CODING',
    'Read one first name and print Welcome, followed by a space and the name.',
    'name = input()\n',
    'name = input()\nprint("Welcome,", name)',
    'Alex',
    'Welcome, Alex',
    'print() places a space between its arguments.',
  ),
  problem(
    'ticket-packs',
    4,
    'Count complete packs',
    'CODE_COMPLETION',
    'Replace the blank with the operator for whole-number division.',
    'print(17 ___ 4)',
    'print(17 // 4)',
    'None',
    '4',
    'Use two forward slashes.',
  ),
  problem(
    'pass-mark',
    5,
    'Check the pass mark',
    'CODING',
    'Read an integer score from 0 to 100. Print Pass for scores of at least 50 and Retry for lower scores.',
    'score = int(input())\n',
    'score = int(input())\nif score >= 50:\n    print("Pass")\nelse:\n    print("Retry")',
    '50',
    'Pass',
    'Include the boundary with >=.',
  ),
  problem(
    'branch-trace',
    5,
    'Trace the branch',
    'OUTPUT_PREDICTION',
    'Which word is printed for the given temperature?',
    'temp = 18\nif temp > 20:\n    print("Warm")\nelse:\n    print("Cool")',
    'Cool',
    'None',
    'Cool',
    'Eighteen falls into the else branch.',
  ),
  problem(
    'loop-count',
    6,
    'Count the iterations',
    'OUTPUT_PREDICTION',
    'Enter the final total printed after the loop.',
    'total = 0\nfor i in range(4):\n    total += i\nprint(total)',
    '6',
    'None',
    '6',
    'range(4) produces 0, 1, 2, and 3.',
  ),
  problem(
    'repair-range',
    6,
    'Fix the final lap',
    'DEBUGGING',
    'Change the loop so it prints the numbers 1 through 3, each on its own line.',
    'for i in range(1, 3):\n    print(i)',
    'for i in range(1, 4):\n    print(i)',
    'None',
    '1\n2\n3',
    'The stop argument is exclusive.',
  ),
  problem(
    'double-value',
    7,
    'Double a value',
    'CODE_COMPLETION',
    'Complete the function so it returns twice its argument.',
    'def double(n):\n    return ___',
    'def double(n):\n    return n * 2',
    'double(5)',
    '10',
    'Multiply the parameter by two.',
  ),
  problem(
    'index-list',
    8,
    'Find the middle item',
    'OUTPUT_PREDICTION',
    'Predict the item selected by this index.',
    'colors = ["mint", "lilac", "gold"]\nprint(colors[1])',
    'lilac',
    'None',
    'lilac',
    'The first index is zero.',
  ),
  problem(
    'unique-items',
    9,
    'Remove duplicates',
    'MULTIPLE_CHOICE',
    'Which collection stores unique values and supports membership checks?',
    '',
    'set',
    '[2, 2, 5]',
    '{2, 5}',
    'This collection has no duplicate elements.',
    ['list', 'tuple', 'set', 'str'],
  ),
  problem(
    'slice-text',
    10,
    'Slice a course code',
    'OUTPUT_PREDICTION',
    'Enter the substring printed by this slice.',
    'print("ITDS120"[4:])',
    '120',
    'None',
    '120',
    'Counting from zero, index four is the first digit.',
  ),
  problem(
    'safe-file',
    11,
    'Close a file safely',
    'MULTIPLE_CHOICE',
    'Which statement closes the file automatically when its block ends?',
    '',
    'with open("notes.txt") as f:',
    'notes.txt',
    'Automatic close',
    'Look for the context manager.',
    [
      'f = open("notes.txt")',
      'with open("notes.txt") as f:',
      'f.read()',
      'print(f)',
    ],
  ),
  problem(
    'sum-even',
    12,
    'Sum even scores',
    'CODING',
    'Sum the even values in the supplied scores list and print the total.',
    'scores = [2, 3, 4, 7]\n',
    'scores = [2, 3, 4, 7]\nprint(sum(n for n in scores if n % 2 == 0))',
    '[2, 3, 4, 7]',
    '6',
    'Filter values using the remainder operator.',
  ),
]
exercises.sort((a, b) => a.module - b.module)
export const typeLabel: Record<ExerciseType, string> = {
  CODING: 'Coding challenge',
  DEBUGGING: 'Debugging',
  OUTPUT_PREDICTION: 'Output prediction',
  CODE_COMPLETION: 'Code completion',
  MULTIPLE_CHOICE: 'Multiple choice',
  SQL: 'SQL',
  WEB: 'Web',
}
export const coursePath = '/courses/itds120'
export const modulePath = (id: number) => coursePath + '/modules/' + id
export const practicePath = (id: string) => '/practice/' + id
export const featured = exercises[0]
