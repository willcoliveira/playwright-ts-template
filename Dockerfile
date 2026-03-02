FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
