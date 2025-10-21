# Стадия сборки
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Стадия запуска
FROM node:18-alpine

WORKDIR /app

# Устанавливаем простой HTTP-сервер
RUN npm install -g serve

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist

EXPOSE 4200

# Запускаем сервер для статики на порту 4200
CMD ["serve", "-s", "dist", "-l", "4200"]