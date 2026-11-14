import mongoose from 'mongoose'

const quizAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      index: true,
    },

    quizType: {
      type: String,
      enum: ['database', 'ai', 'live'],
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },

    correctAnswers: {
      type: Number,
      required: true,
      min: 0,
    },

    incorrectAnswers: {
      type: Number,
      required: true,
      min: 0,
    },

    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    // For live quiz attempts: reference to LiveQuizAttempt document
    liveAttemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LiveQuizAttempt',
      default: null,
    },

    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Prevent duplicate live quiz attempt submissions
quizAttemptSchema.index(
  { studentId: 1, liveAttemptId: 1 },
  { unique: true, partialFilterExpression: { liveAttemptId: { $ne: null } } },
)

const QuizAttempt =
  mongoose.models.QuizAttempt ||
  mongoose.model('QuizAttempt', quizAttemptSchema)

export default QuizAttempt
