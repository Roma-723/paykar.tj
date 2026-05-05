# VibeCheck

Анонимная доска настроений, где пользователи могут публиковать короткие сообщения и ставить лайки.
 
---

## 📌 Описание проекта

VibeCheck — это простое fullstack-приложение:

* Публикация коротких сообщений (до 280 символов)
* Лайки сообщений
* Без регистрации
* Быстрый и минималистичный интерфейс

---

## 🛠️ Технологии

### Backend

* FastAPI
* SQLModel
* SQLite
* Uvicorn

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS

---

## 📁 Структура проекта

```
vibecheck/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   └── routers/
│   │       └── vibes.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── .env.local
│
└── README.md
```

---

## ⚙️ Backend

### Запуск

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Сервер:
http://localhost:8000

Swagger:
http://localhost:8000/docs

---

### API

* `GET /api/vibes` — получить все сообщения
* `POST /api/vibes` — создать сообщение
* `PATCH /api/vibes/{id}/like` — поставить лайк

---

### Модель данных

```json
{
  "id": 1,
  "content": "hello world",
  "created_at": "2026-05-04T12:00:00",
  "likes": 0
}
```

---

### CORS (важно)

Включить в FastAPI:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🎨 Frontend

### Запуск

```bash
cd frontend
npm install
npm run dev
```

Сайт:
http://localhost:3000

---

### Функционал

* Форма добавления сообщения
* Лента сообщений
* Лайки
* Обновление данных после действий

---

### ENV

`.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🔄 Как работает

1. Frontend отправляет запросы в FastAPI
2. Backend работает с SQLite
3. Возвращает данные
4. UI обновляется

---

## ✅ Требования выполнены

* FastAPI сервер
* SQLite база
* SQLModel модели
* CRUD API
* CORS настроен
* Next.js frontend
* Tailwind стили
* Связка frontend + backend

---

## 🚀 Результат

Готовое fullstack приложение с:

* API
* UI
* базой данных
* рабочей интеграцией

---
