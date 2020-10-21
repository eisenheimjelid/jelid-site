# Build
FROM node:12-alpine AS builder
WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Exec
FROM node:12-alpine

WORKDIR /app

# Default variables (this change on runtime depending the deployment)
ENV BACKEND_ENV=""
ENV BACKEND_SITE=""

EXPOSE 8080

COPY --from=builder /app .

CMD [ "node", "server.js"]