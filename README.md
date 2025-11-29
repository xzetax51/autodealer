## Getting Started

First, run the development server:

```bash
# Установка зависимостей проекта
npm install

# Создание файла переменных окружения
cp .env.example .env

# Запуск Docker контейнера с PostgreSQL docker compose up -d

# Применение миграций БД
npx prisma migrate dev

# Запуск приложения в режиме разработки
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

