# Stage 1
FROM node:15-alpine as yarn-install
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json yarn.lock swaggerConfig.json tsconfig.json ./
COPY src/ ./src
RUN apk update && \
    apk upgrade && \
    apk add --no-cache --virtual build-dependencies bash git openssh python make g++ && \
    yarn --frozen-lockfile --no-cache && \
    yarn build && \
    apk del build-dependencies

# Runtime container with minimal dependencies
FROM node:15-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production=true
COPY --from=yarn-install /usr/src/app/lib /usr/src/app/lib/src

EXPOSE 3000
CMD [ "yarn", "start" ]
