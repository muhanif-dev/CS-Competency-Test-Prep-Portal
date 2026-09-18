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
    // Yeh ids EXACTLY frontend ke src/data/competencies.js jaisi honi chahiye
    competencyId: { type: String, required: true, trim: true, index: true },
    competencyName: { type: String, required: true, trim: true },
    topicId: { type: String, required: true, trim: true, index: true },
    topicName: { type: String, required: true, trim: true },

    question: { type: String, required: true, trim: true },

    options: {
      type: [optionSchema],
      validate: {
        validator: (val) => Array.isArray(val) && val.length === 4,
        message: 'A question must have exactly 4 options (A, B, C, D).',
      },
    },

    correctAnswer: { type: String, required: true, enum: ['A', 'B', 'C', 'D'] },
    explanation: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
  },
  { timestamps: true },
)

questionSchema.index({ competencyId: 1, topicId: 1, difficulty: 1 })

export default mongoose.model('Question', questionSchema)