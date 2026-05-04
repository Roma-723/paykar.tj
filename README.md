# VibeCheck

An anonymous mood board web application where users can share short thoughts ("vibes") and engage with the community through likes. No authentication required — just share freely.

## What is VibeCheck?

VibeCheck is a simple, real-time social platform for posting anonymous messages (vibes) up to 280 characters and liking content from other users. The app features a modern dark UI, optimistic state updates, and instant visual feedback for all interactions.

**Key Features:**
- Post anonymous vibes (0–280 characters)
- Like posts with instant UI feedback
- Real-time feed of all vibes
- No sign-up or authentication
- Responsive, dark-themed interface with cinematic animations

## Project Structure

```
vibecheck/
├── frontend/                    # Next.js client application
│   ├── app/                     # App Router pages and layouts
│   │   ├── page.tsx            # Main feed page
│   │   ├── layout.tsx          # Root layout with Toaster
│   │   └── globals.css         # Global styles and animations
│   ├── components/              # Reusable React components
│   │   ├── VibeForm.tsx        # Post creation form with cinematic focus
│   │   └── VibeCard.tsx        # Individual vibe card with like button
│   ├── .env.local              # Environment variables (frontend)
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                     # FastAPI server application
│   ├── app/
│   │   ├── main.py             # FastAPI application entry point
│   │   ├── models.py           # SQLModel data models
│   │   ├── database.py         # Database configuration
│   │   └── routers/
│   │       └── vibes.py        # Vibe API endpoints
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables (backend)
│   └── vibecheck.db            # SQLite database (auto-generated)
│
└── README.md                    # This file
```

### Frontend (`frontend/`)
- **Purpose:** Renders the user interface, handles client-side state, and communicates with the backend API
- **Handles:** Fetching vibes, creating new posts, liking posts, displaying real-time feedback
- **Technology:** Next.js 15, React 18, TypeScript, Tailwind CSS, Framer Motion

### Backend (`backend/`)
- **Purpose:** Provides REST API endpoints, manages data persistence, and handles business logic
- **Handles:** CRUD operations for vibes, like counter increments, data validation, CORS support
- **Technology:** FastAPI, SQLModel, SQLite, Uvicorn, Pydantic v2

## Tech Stack

### Backend

**FastAPI**
- **Why chosen:** Fast async framework with automatic OpenAPI documentation. Zero-boilerplate approach reduces development time. High performance suitable for I/O-heavy operations like database queries.

**SQLite**
- **Why chosen:** Zero-configuration relational database perfect for rapid development and prototyping. No external server required. Data persists locally with minimal setup. Easily upgradeable to PostgreSQL for production.

**SQLModel**
- **Why chosen:** Bridges SQLAlchemy ORM and Pydantic validation. Single source of truth for data models (both database schema and API request/response schemas). Reduces code duplication and improves maintainability.

**Uvicorn**
- **Why chosen:** Lightning-fast ASGI server. Perfect complement to FastAPI's async capabilities. Supports hot-reload for development. Lightweight and production-ready.

### Frontend

**Next.js 15 (App Router)**
- **Why chosen:** Modern React framework with App Router for better code organization. Built-in server-side rendering and static generation for performance. Excellent TypeScript integration.

**React Hooks (useState, useEffect)**
- **Why chosen:** Lightweight state management without Redux complexity. Perfect for small-to-medium projects. Hooks provide clean, functional approach to component logic. Sufficient for optimistic UI updates and real-time feedback.

**Tailwind CSS**
- **Why chosen:** Utility-first CSS framework for rapid UI development. Excellent dark mode support. Consistent design system with minimal custom CSS. Highly responsive and mobile-friendly out of the box.

**Framer Motion**
- **Why chosen:** Smooth, performant animations with minimal code. Creates cinematic focus states and micro-interactions. Excellent TypeScript support. Lightweight library with no heavy dependencies.

**Lucide React**
- **Why chosen:** Consistent, modern icon library with lightweight SVG icons. Better than emoji for professional appearance and consistency.

**React Hot Toast**
- **Why chosen:** Non-intrusive notifications for user feedback. Lightweight and accessible. Perfect for async operation feedback (success/error messages).

**date-fns**
- **Why chosen:** Reliable date manipulation and formatting. Handles timezone issues correctly. Smaller bundle size than alternatives. Perfect for "time ago" calculations.

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/vibes` | Fetch all vibes (returns array of Vibe objects) |
| POST | `/api/vibes` | Create a new vibe (request: `{content: string}`) |
| PATCH | `/api/vibes/{id}/like` | Increment like counter for a vibe |
| GET | `/health` | Health check endpoint |

**Base URL:** `http://localhost:8000` (development)

## Data Model

### Vibe

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | Integer | Primary Key, Auto-increment | Unique identifier |
| `content` | String | Required, Max 280 chars | The vibe text message |
| `created_at` | DateTime | Default: current UTC time | Timestamp of creation |
| `likes` | Integer | Default: 0 | Number of likes |

**Example Response:**
```json
{
  "id": 1,
  "content": "feeling great today!",
  "created_at": "2026-05-04T13:34:36.974642",
  "likes": 5
}
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0 (frontend)
- **Python** ≥ 3.14 (backend)
- **npm** or **yarn** (frontend package manager)
- **pip** (Python package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a Python virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   
   **Windows:**
   ```bash
   venv\Scripts\activate
   ```
   
   **macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the FastAPI server:**
   ```bash
   uvicorn main:app --reload
   ```
   
   Server will start at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file with API URL:**
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Application will open at `http://localhost:3000`

### Verify Both Services

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/docs (interactive Swagger UI)
- **Backend Health Check:** http://localhost:8000/health

## Environment Variables

### Frontend (`.env.local`)

```env
# API base URL for all fetch requests
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Note:** The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser. Variables without this prefix are server-only.

### Backend (`.env`)

```env
# Database connection string
DATABASE_URL=sqlite:///vibecheck.db

# CORS allowed origins (comma-separated)
CORS_ORIGINS=http://localhost:3000

# Debug mode
DEBUG=True
```

## Important Notes

### CORS Configuration
CORS is configured in FastAPI to allow requests from the frontend. Requests include credentials (`credentials: 'include'`) for future authentication features.

### State Management
The frontend uses only React Hooks (`useState`, `useEffect`) for state management. No Redux or external state management libraries. This keeps the codebase simple and lightweight.

### Optimistic UI Updates
Like button implements optimistic updates:
1. UI updates immediately (no waiting for server response)
2. Toast notification shows instant feedback ("Liked!")
3. API call happens in background
4. If API fails, state automatically reverts with error toast

This provides excellent user experience with instant visual feedback.

### Cinematic Focus State
The post creation form features an animated laser glow border with 3D depth effects when focused:
- Multi-color cycling border (violet → cyan)
- Subtle 3D perspective and floating effect
- Character counter changes color on focus
- Pulsing gradient button with scale animations

### Data Persistence
SQLite database file (`vibecheck.db`) is created automatically on first run in the backend directory. All data persists across server restarts.

## Development Tips

- **Hot Reload:** Both frontend (Next.js) and backend (Uvicorn) support hot reload during development. Changes are reflected immediately.
- **API Documentation:** Visit `http://localhost:8000/docs` for interactive Swagger documentation of all endpoints.
- **Network Tab:** Use browser DevTools Network tab to inspect API requests and responses.
- **Time Display:** Dates display as relative time ("2m ago", "1h ago") instead of absolute timestamps for better UX.
- **Text Wrapping:** Long unbroken strings in vibes are handled with CSS `word-break` and `overflow-wrap` to prevent UI overflow.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Production Deployment

### Frontend
```bash
npm run build
npm start
```

### Backend
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

Update `.env` variables for production endpoints and security settings.


**Version:** 1.0.0  
**Last Updated:** May 2026
