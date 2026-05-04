# VibeCheck Backend (FastAPI)

Легковесный REST API для приложения VibeCheck — анонимной доски настроений.

## Структура проекта

```
backend/
├── main.py              # Точка входа приложения
├── models.py            # SQLModel определения (Vibe, VibeCreate, VibeRead)
├── database.py          # Конфигурация БД и сессии
├── routers/
│   ├── __init__.py
│   └── vibes.py         # API маршруты для работы с вайбами
├── requirements.txt     # Зависимости Python
└── vibecheck.db         # SQLite база данных (создаётся автоматически)
```

## Установка

### Требования

- Python 3.10+
- pip

### Шаги установки

1. **Перейти в папку backend:**
   ```bash
   cd backend
   ```

2. **Создать виртуальное окружение (рекомендуется):**
   ```bash
   python -m venv venv
   ```

3. **Активировать окружение:**
   - **Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **Windows (cmd):**
     ```cmd
     venv\Scripts\activate.bat
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Установить зависимости:**
   ```bash
   pip install -r requirements.txt
   ```

## Запуск сервера

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Сервер будет доступен по адресу: `http://localhost:8000`

### Интерактивная документация API

Swagger UI: `http://localhost:8000/docs`
ReDoc: `http://localhost:8000/redoc`

## API Эндпоинты

### 1. Получить все вайбы

```http
GET /api/vibes
```

**Ответ (200):**
```json
[
  {
    "id": 1,
    "content": "Отличный день!",
    "created_at": "2024-01-15T10:30:00",
    "likes": 5
  },
  {
    "id": 2,
    "content": "Немного устал",
    "created_at": "2024-01-15T09:15:00",
    "likes": 2
  }
]
```

### 2. Создать новый вайб

```http
POST /api/vibes
Content-Type: application/json

{
  "content": "Мой текущий вайб"
}
```

**Валидация:**
- `content` обязателен (не пусто)
- `content` максимум 280 символов

**Ответ (200):**
```json
{
  "id": 3,
  "content": "Мой текущий вайб",
  "created_at": "2024-01-15T10:45:00",
  "likes": 0
}
```

### 3. Добавить лайк вайбу

```http
PATCH /api/vibes/{id}/like
```

**Параметры:**
- `id` (path): ID вайба

**Ответ (200):**
```json
{
  "id": 1,
  "content": "Отличный день!",
  "created_at": "2024-01-15T10:30:00",
  "likes": 6
}
```

**Ошибка (404):**
```json
{
  "detail": "Vibe not found"
}
```

## Модель данных

### Vibe (таблица)
- `id` (int): Первичный ключ
- `content` (str): Текст вайба, макс. 280 символов
- `created_at` (datetime): Дата и время создания (автогенерируется)
- `likes` (int): Счётчик лайков (по умолчанию 0)

## CORS Конфигурация

API настроен для принятия запросов с фронтенда по адресу `http://localhost:3000`.

Если нужно добавить другой адрес, отредактируйте список `origins` в `main.py`:

```python
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Добавить здесь новые origins
]
```

## Трубельшутинг

### 1. Ошибка: "Port 8000 is already in use"

Сервер уже запущен на этом порту. Либо остановите его, либо используйте другой порт:

```bash
uvicorn main:app --reload --port 8001
```

### 2. Ошибка: "Module not found"

Убедитесь, что вы находитесь в папке `backend` и установили все зависимости:

```bash
pip install -r requirements.txt
```

### 3. База данных повреждена

Удалите файл `vibecheck.db` и пересоздайте при следующем запуске:

```bash
rm vibecheck.db  # macOS/Linux
del vibecheck.db # Windows
```

## Примеры использования

### curl

```bash
# Получить все вайбы
curl http://localhost:8000/api/vibes

# Создать новый вайб
curl -X POST http://localhost:8000/api/vibes \
  -H "Content-Type: application/json" \
  -d '{"content": "Супер настроение!"}'

# Добавить лайк вайбу с ID 1
curl -X PATCH http://localhost:8000/api/vibes/1/like
```

### Python (requests)

```python
import requests

BASE_URL = "http://localhost:8000"

# Получить все вайбы
response = requests.get(f"{BASE_URL}/api/vibes")
vibes = response.json()

# Создать вайб
new_vibe = {"content": "Классный день!"}
response = requests.post(f"{BASE_URL}/api/vibes", json=new_vibe)
created = response.json()

# Добавить лайк
response = requests.patch(f"{BASE_URL}/api/vibes/1/like")
updated = response.json()
```

## Разработка

Сервер запущен с флагом `--reload`, поэтому будет автоматически перезагружаться при изменении кода.

При добавлении новых эндпоинтов:
1. Добавьте функцию в `routers/vibes.py`
2. Используйте Pydantic/SQLModel схемы для типизации
3. Добавьте документацию в docstring

## Дополнительно

- **Database**: SQLite (встроенная, файловая БД)
- **ORM**: SQLModel (комбинирует SQLAlchemy + Pydantic)
- **Framework**: FastAPI (современный, быстрый веб-фреймворк)
- **Server**: Uvicorn (ASGI сервер)
