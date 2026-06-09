# ASCII Vision Studio AI

A premium visual computing prototype that turns images, GIFs, videos, and webcam streams into ASCII, Unicode, Braille, and Emoji art.

## What is in this repo

- `src/`: a polished React + Vite frontend with routed pages
- `backend/`: a FastAPI scaffold that matches the project blueprint
- `src/lib/ascii.ts`: browser-side conversion, export, and smart tuning helpers

## Run the frontend

```bash
npm install
npm run dev
```

## Build the frontend

```bash
npm run build
```

## Backend scaffold

The backend is only a skeleton for now, but it is structured for:

- media upload
- conversion jobs
- project history
- analytics
- export endpoints

If you want to run it later:

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Product direction

The UI is designed to feel like a premium SaaS tool:

- dark glassmorphism surfaces
- live ASCII preview
- studio controls
- analytics dashboard
- gallery and history shells
- technical about page

