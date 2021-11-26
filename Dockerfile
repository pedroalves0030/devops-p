FROM node:12-alpine@sha256:88656c98cc43bafa6a517dfdb7b4945693c47ff7d0d24da2254a3174d308f93e

RUN apk add dumb-init=1.2.2-r1 --no-cache

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN yarn install --production && yarn cache clean

USER node

CMD ["dumb-init", "node", "index"]
