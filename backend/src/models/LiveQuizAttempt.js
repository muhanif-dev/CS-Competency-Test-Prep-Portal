import mongoose from 'mongoose'

const liveQuestionItemSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
    },
    competencyId: {
      type: String,
      required: true,
    },
    competencyName: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
        _id: false,
      },
    ],
    // Correct answer and explanation are stored securely on the server;
    // they are NEVER returned in student-facing responses.
    correctAnswer: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
    },
    explanation: {
      type: String,
      default: '',
    },
    studentAnswer: {
      type: String,
      default: null,
      enum: ['A', 'B', 'C', 'D', null],
    },
    isAnswered: {
      type: Boolean,
      default: false,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    answeredAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
)

const liveQuizAttemptSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
    },
    questionCount: {
      type: Number,
      required: true,
      enum: [20, 50, 100],
    },
    sessionToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'abandoned'],
      default: 'in-progress',
      index: true,
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
    },
    questions: {
      type: [liveQuestionItemSchema],
      required: true,
    },
    score: {
      total: { type: Number, default: 0 },
      attempted: { type: Number, default: 0 },
      unanswered: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
      incorrect: { type: Number, default: 0 },
    },
    isAnnounced: {
      type: Boolean,
      default: false,
      index: true,
    },
    announcedAt: {
      type: Date,
      default: null,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

const LiveQuizAttempt =
  mongoose.models.LiveQuizAttempt ||
  mongoose.model('LiveQuizAttempt', liveQuizAttemptSchema)

export default LiveQuizAttempt
