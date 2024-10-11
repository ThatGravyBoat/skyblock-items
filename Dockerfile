FROM node:18.6-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD ["npm", "run", "start"]
LABEL org.opencontainers.image.source=https://github.com/ThatGravyBoat/skyblock-items
LABEL org.opencontainers.image.description="SkyBlock-Items"
LABEL org.opencontainers.image.licenses=ARR