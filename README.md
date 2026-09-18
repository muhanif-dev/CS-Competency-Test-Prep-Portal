# CS Competency Test Preparation Portal

Frontend-only React application for practicing Computer Science competency test questions with **topic-scoped AI-generated quizzes**.

## Stack

- React + Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

## Setup

```bash
npm install
cp .env.example .env
# Add your Google Gemini API key to .env
npm run dev
```

## AI API (browser-safe configuration)

This app calls **Google Gemini** directly from the browser. OpenAI/Anthropic **secret** keys must not be embedded in client bundles.

For Gemini:

1. Create an API key at [Google AI Studio](https://aistudio.google.com/apikey).
2. Set `VITE_GEMINI_API_KEY` in `.env` (never commit `.env`).
3. For production, restrict the key in [Google Cloud Console](https://console.cloud.google.com/): limit APIs and add **HTTP referrer** restrictions.

`VITE_*` variables are included in the client build by design; restrictions reduce misuse if someone inspects the bundle.

Optional: `VITE_GEMINI_MODEL` (default: `gemini-2.0-flash`).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview production build

## Flow

Home → Competency & Topic → Quiz Setup → Generate AI Quiz → Validated JSON → Quiz → Results → Generate New Quiz

Competency and topic data live in `src/data/competencies.js` and are the only selectable syllabus sources.
