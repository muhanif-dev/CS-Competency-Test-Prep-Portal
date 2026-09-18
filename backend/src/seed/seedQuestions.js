import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import Question from '../models/Question.js'

const sampleQuestions = [
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'Which of the following is NOT a valid variable naming convention in most programming languages?',
    options: [
      { id: 'A', text: 'camelCase' },
      { id: 'B', text: 'snake_case' },
      { id: 'C', text: '1stVariable' },
      { id: 'D', text: '_underscoreStart' },
    ],
    correctAnswer: 'C',
    explanation: 'Variable names cannot start with a digit in most programming languages.',
    difficulty: 'Easy',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'What does an algorithm mean in programming?',
    options: [
      { id: 'A', text: 'A programming language' },
      { id: 'B', text: 'A step-by-step procedure to solve a problem' },
      { id: 'C', text: 'A type of variable' },
      { id: 'D', text: 'A hardware component' },
    ],
    correctAnswer: 'B',
    explanation: 'An algorithm is a well-defined, step-by-step procedure to solve a problem.',
    difficulty: 'Easy',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'Which of these is an example of a compiled language (not interpreted)?',
    options: [
      { id: 'A', text: 'Python' },
      { id: 'B', text: 'C++' },
      { id: 'C', text: 'JavaScript' },
      { id: 'D', text: 'PHP' },
    ],
    correctAnswer: 'B',
    explanation: 'C++ code is compiled directly into machine code before execution, unlike Python or JavaScript.',
    difficulty: 'Medium',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'What is the purpose of pseudocode?',
    options: [
      { id: 'A', text: 'To execute a program directly' },
      { id: 'B', text: 'To plan program logic in plain, language-independent steps' },
      { id: 'C', text: 'To compile source code faster' },
      { id: 'D', text: 'To replace comments in code' },
    ],
    correctAnswer: 'B',
    explanation: 'Pseudocode is an informal, high-level description of program logic used for planning before actual coding.',
    difficulty: 'Easy',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'Which statement about a flowchart is TRUE?',
    options: [
      { id: 'A', text: 'It is a type of data structure' },
      { id: 'B', text: 'It is a graphical representation of an algorithm' },
      { id: 'C', text: 'It only works for object-oriented languages' },
      { id: 'D', text: 'It replaces the need for source code entirely' },
    ],
    correctAnswer: 'B',
    explanation: 'A flowchart visually represents the steps and logic flow of an algorithm using standard symbols.',
    difficulty: 'Easy',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'What is a "syntax error"?',
    options: [
      { id: 'A', text: 'An error in program logic that gives wrong output' },
      { id: 'B', text: 'A violation of the rules of the programming language' },
      { id: 'C', text: 'An error that only occurs at runtime' },
      { id: 'D', text: 'A hardware-related failure' },
    ],
    correctAnswer: 'B',
    explanation: 'A syntax error occurs when code does not follow the grammatical rules of the programming language.',
    difficulty: 'Medium',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'In programming, what is meant by "compilation"?',
    options: [
      { id: 'A', text: 'Running a program step by step manually' },
      { id: 'B', text: 'Translating source code into machine code before execution' },
      { id: 'C', text: 'Deleting unused variables' },
      { id: 'D', text: 'Writing comments in the code' },
    ],
    correctAnswer: 'B',
    explanation: 'Compilation is the process of translating source code into machine-executable code before running it.',
    difficulty: 'Medium',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'Which of the following best describes an "interpreter"?',
    options: [
      { id: 'A', text: 'It translates and executes code line by line' },
      { id: 'B', text: 'It converts the whole program into machine code once, before running' },
      { id: 'C', text: 'It only checks for syntax errors' },
      { id: 'D', text: 'It is a type of variable' },
    ],
    correctAnswer: 'A',
    explanation: 'An interpreter translates and executes source code line by line, rather than compiling it all at once.',
    difficulty: 'Medium',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'What is the main advantage of using functions in programming?',
    options: [
      { id: 'A', text: 'They make code slower but easier to read' },
      { id: 'B', text: 'They allow code reuse and better organization' },
      { id: 'C', text: 'They are only used in object-oriented programming' },
      { id: 'D', text: 'They eliminate the need for variables' },
    ],
    correctAnswer: 'B',
    explanation: 'Functions promote code reusability, modularity, and easier maintenance.',
    difficulty: 'Easy',
  },
  {
    competencyId: 'programming-cpp-java-python',
    competencyName: 'Programming (C++/Java/Python)',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    question: 'Which of these is considered a "high-level" programming language?',
    options: [
      { id: 'A', text: 'Assembly language' },
      { id: 'B', text: 'Machine code' },
      { id: 'C', text: 'Python' },
      { id: 'D', text: 'Binary code' },
    ],
    correctAnswer: 'C',
    explanation: 'Python is a high-level language, meaning it is closer to human-readable language and more abstracted from hardware.',
    difficulty: 'Easy',
  },
]

async function seed() {
  await connectDB()

  const competencyId = sampleQuestions[0].competencyId
  const topicId = sampleQuestions[0].topicId

  const deleted = await Question.deleteMany({ competencyId, topicId })
  console.log(`🗑️  Purani ${deleted.deletedCount} sample question(s) hata di gayi (agar thi).`)

  const inserted = await Question.insertMany(sampleQuestions)
  console.log(`✅ ${inserted.length} sample MCQs successfully seed ho gaye.`)

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})