FROM node:19-alpine3.16 AS builder
ADD . /app
RUN apk add bash
RUN apk add --update alpine-sdk
WORKDIR /app
COPY package*.json /app/
RUN npm install -g typescript
COPY src ./src
COPY tsconfig.json ./
RUN npm install
RUN npm run build

# RUN npm run build

FROM node:19-alpine3.16
RUN apk add bash
RUN apk add --update alpine-sdk
RUN apk update
RUN apk upgrade
ADD . /app
WORKDIR /app
COPY package*.json /app/
# RUN npm install pm2 -g
# RUN npm install sharp
COPY --from=builder ./app/dist/ .
EXPOSE 3000
CMD ["npm","run","start"]
