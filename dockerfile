FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --production-only

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]