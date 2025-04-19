# Используйте официальный Node.js образ
FROM node:22

# Установите pnpm
RUN npm install -g pnpm

# Установите рабочую директорию
WORKDIR /usr/src/app

# Скопируйте только package.json и pnpm-lock.yaml (если есть)
COPY package.json pnpm-lock.yaml* ./

# Установите зависимости с помощью pnpm
RUN pnpm install

# Скопируйте все файлы приложения
COPY . .

# Соберите приложение Next.js
RUN pnpm build

# Установите переменную окружения для Next.js
ENV NODE_ENV production

# Запустите приложение
CMD ["pnpm", "start"]