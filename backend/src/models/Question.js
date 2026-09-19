import mongoose from 'mongoose'

const optionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, enum: ['A', 'B', 'C', 'D'] },
    text: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const questionSchema = new mongoose.Schema(
  {
    // Yeh id MUST frontend ke src/data/competencies.js ke competency "id"
    // se match honi chahiye (e.g. 'cyber-security', 'programming-cpp-java-python').
    competencyId: { type: String, required: true, trim: true, index: true },
    competencyName: { type: String, required: true, trim: true },

    question: { type: String, required: true, trim: true },

    options: {
      type: [optionSchema],
      validate: {
        validator: (val) => Array.isArray(val) && val.length === 4,
        message: 'A question must have exactly 4 options (A, B, C, D).',
      },
    },

    correctAnswer: { type: String, required: true, enum: ['A', 'B', 'C', 'D'] },
    // Optional: source files (Word docs) aksar explanation nahi dete.
    explanation: { type: String, trim: true, default: '' },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
  },
  { timestamps: true },
)

questionSchema.index({ competencyId: 1, difficulty: 1 })

export default mongoose.model('Question', questionSchema)