FROM node:20

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 80

# Khởi động ứng dụng React khi container được chạy
CMD ["yarn", "start"]
