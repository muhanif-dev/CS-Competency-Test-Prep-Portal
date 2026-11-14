import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters.'],
      maxlength: [100, 'Full name must not exceed 100 characters.'],
    },

    email: {
      type: String,
      required: [true, 'Email address is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    },

    university: {
      type: String,
      required: [true, 'University name is required.'],
      trim: true,
      minlength: [2, 'University name must be at least 2 characters.'],
      maxlength: [150, 'University name must not exceed 150 characters.'],
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['student'],
      default: 'student',
    },

    // Cumulative performance stats
    totalCorrect: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalIncorrect: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAttempted: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalQuizzes: {
      type: Number,
      default: 0,
      min: 0,
    },

    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  },
)

studentSchema.set('toJSON', { virtuals: true })
studentSchema.set('toObject', { virtuals: true })

// Indexes for leaderboard sorting according to requirements:
// 1. totalCorrect (desc)
// 2. accuracy (desc)
// 3. updatedAt (asc - earlier achievement)
studentSchema.index({ totalCorrect: -1, accuracy: -1, updatedAt: 1 })

const Student =
  mongoose.models.Student || mongoose.model('Student', studentSchema)

export default Student
