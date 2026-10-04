# UttarakhandSpeaks AI — Frontend

Modern React 18 frontend for the UttarakhandSpeaks AI app.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| State | React Context API |
| HTTP | Axios |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.tsx
│   ├── MessagePanel.tsx
│   └── UserInput.tsx
├── context/
│   └── AppContext.tsx # Global state (username, animeName, currentImage, token)
├── constants/
│   └── index.ts      # Character data, view/type/mood options
├── pages/
│   ├── LoginPage.tsx
│   ├── SelectCharacterPage.tsx
│   ├── SelectVisualsPage.tsx
│   ├── ChatPage.tsx
│   ├── GenerateImagePage.tsx
│   └── PaymentPage.tsx
├── services/
│   └── api.ts        # Axios client + all API functions
├── types/
│   └── index.ts      # TypeScript interfaces & enums
├── App.tsx           # Router setup
├── main.tsx          # Entry point
└── index.css         # Tailwind + global styles
```

## Routes

| Path | Page |
|---|---|
| `/` | → redirect to `/selectCharacter` |
| `/login` | Login / Register |
| `/selectCharacter` | Choose AI character |
| `/selectVisuals` | Customize scene & appearance |
| `/chatpage` | Chat with AI character |
| `/generateImg` | Generate character image |
| `/payment` | Payment via Razorpay |

## Getting Started

```bash
npm install
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build
```

## Backend API

The Vite dev server proxies `/api/*` requests to `http://localhost:8000`.
Configure the target in `vite.config.ts` → `server.proxy`.

### Endpoints Used

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/` | Health check |
| `POST` | `/api/api/predict` | Chat query |
| `POST` | `/api/api/login/` | Create user |
| `POST` | `/api/api/select_anime/` | Select anime/character |
| `GET` | `/api/api/initchat` | Initialize chat |
| `POST` | `/api/auth/register` | Register |
| `POST` | `/api/auth/authenticate` | Login |
| `POST` | `http://localhost:8080/pg/createOrder` | Payment order |
