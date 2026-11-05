import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const key = env.match(/VITE_GEMINI_API_KEY=(.*)/)?.[1]?.trim();
const model = env.match(/VITE_GEMINI_MODEL=(.*)/)?.[1]?.trim() || 'gemini-3.5-flash';

console.log('Testing Gemini AI quiz generation with model', model);

async function test() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const prompt = `You are an expert Computer Science educator.
Generate exactly 2 multiple-choice questions on the topic "React Hooks".
Return ONLY valid JSON matching the schema:
{ "questions": [ { "id": "q1", "question": "...", "options": [{"id":"A","text":"..."},{"id":"B","text":"..."},{"id":"C","text":"..."},{"id":"D","text":"..."}], "correctAnswer": "A", "explanation": "...", "difficulty": "Easy" } ] }`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });

  const data = await res.json();
  console.log('Response JSON:', JSON.stringify(data, null, 2));
  const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
  if (!text) {
    console.error('No text returned, maybe rate limited or error:', data.error?.message || 'unknown');
    return;
  }
  console.log('Generated Quiz JSON:', text);
}

test().catch(console.error);

