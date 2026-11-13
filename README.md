# CS Competency Test Preparation Portal

Comprehensive Computer Science competency test preparation portal featuring topic-scoped practice, Full Mock Exams, AI quizzes, and a **Live Timed Quiz Examination System** with server-verified scoring and centralized administration.

## Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router, Axios, Lucide React
- **Backend**: Express, MongoDB & Mongoose
- **AI Engine**: Google Gemini API

## Getting Started

### 1. Frontend Setup

```bash
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`.

### 2. Backend Setup

```bash
cd backend
npm install
# Set your environment variables in backend/.env (refer to backend/.env.example)
npm run dev
```

Backend will run at `http://localhost:5000`.

### 3. Backend Environment Variables (`backend/.env`)

Configure the following variables in `backend/.env`:

| Variable | Description | Default |
|---|---|---|
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection URI string | *Required* |
| `CLIENT_ORIGIN` | Allowed client origin(s) for CORS | `http://localhost:5173` |
| `ADMIN_USERNAME` | Username for admin portal authentication | *Required* |
| `ADMIN_PASSWORD` | Password for admin authentication | *Required* |
| `ADMIN_JWT_SECRET` | Random secret for signing HMAC admin tokens (at least 32 characters) | *Required* |

Set all admin credentials in `backend/.env` and use a unique password and random JWT secret. Do not commit `.env` or use example values as production credentials.

### Repairing Question Prompts

After MongoDB access is available, repair stored question prompts from the complete Markdown source and add missing, uniquely matched seed questions without replacing answer keys or deleting question records:

```bash
cd backend
npm run repair:question-prompts
```

Only uniquely matched prompts are updated or inserted; ambiguous matches are skipped and reported. Live quizzes also restore complete prompts from this Markdown source in the bundled question pool.

## Key Features

1. **Full Mock Test**:
   - Comprehensive exam simulation sampling balanced questions across all 10 computer science subjects.
   - Accessible via the "Full Mock Test" navigation entry (`/practice/setup?competency=all`).

2. **Live Quiz Flow (`/live-quiz`)**:
   - Student enters candidate name and selects academic semester (Semester 1 to 8).
   - Selection of 20, 50, or 100 questions.
   - Strict 30-second countdown timer per question.
   - Race-condition guard preventing double submissions between clicks and timer timeouts.
   - Server-side scoring: correct answers are strictly stored on the server and never sent to the client browser.
   - End-of-quiz message: **"Result will be announced."**
   - Centralized result announcement: once announced by admin, the student status dynamically updates to **"Result announced"** with the full verified score report.

3. **Admin Examination Portal (`/admin`)**:
   - Protected with HMAC token authentication and constant-time credential verification.
   - Overview table of all live test attempts showing candidate name, semester, total questions, attempted, unanswered, correct, and incorrect counts.
   - Real-time announcement toggle for individual attempts or in bulk ("Announce All" / "Unannounce All").
   - Detailed question-by-question audit modal for authorized academic review.
