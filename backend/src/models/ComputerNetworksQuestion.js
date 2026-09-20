import mongoose from 'mongoose'

const optionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
)

const computerNetworksQuestionSchema = new mongoose.Schema(
  {
    competencyId: {
      type: String,
      required: true,
      trim: true,
      default: 'computer-networks',
      index: true,
    },

    competencyName: {
      type: String,
      required: true,
      trim: true,
      default: 'Computer Networks & Cloud Computing',
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [optionSchema],

      validate: {
        validator: (val) =>
          Array.isArray(val) && val.length === 4,

        message:
          'A question must have exactly 4 options (A, B, C, D).',
      },
    },

    correctAnswer: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
    },

    explanation: {
      type: String,
      trim: true,
      default: '',
    },

    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
  },

  { timestamps: true },
)

computerNetworksQuestionSchema.index({
  competencyId: 1,
  difficulty: 1,
})

export default mongoose.model(
  'ComputerNetworksQuestion',
  computerNetworksQuestionSchema,
)