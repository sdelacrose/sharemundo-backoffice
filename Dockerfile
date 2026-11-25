FROM node:24.22.3-alpine AS dependencies
WORKDIR /app
ENV HUSKY=0 NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --ignore-scripts --no-audit --no-fund
FROM dependencies AS build
COPY . .
RUN mkdir -p public
ARG NEXT_PUBLIC_RECETTE_MODE=false
ARG NEXT_PUBLIC_BASE_API_URL
ENV NEXT_PUBLIC_RECETTE_MODE=$NEXT_PUBLIC_RECETTE_MODE NEXT_PUBLIC_BASE_API_URL=$NEXT_PUBLIC_BASE_API_URL NODE_OPTIONS=--max-old-space-size=3072
# Build-only placeholders: runtime must receive its own protected Auth0 settings.
ENV AUTH0_SECRET=0000000000000000000000000000000000000000000000000000000000000000 AUTH0_CLIENT_ID=build-only-not-a-real-client AUTH0_CLIENT_SECRET=build-only-not-a-real-secret AUTH0_ISSUER_BASE_URL=https://sharemundo-links-recette.eu.auth0.com AUTH0_AUDIENCE=https://recette.sharemundolinks.fr/api AUTH0_BASE_URL=https://backoffice-recette.sharemundolinks.fr
RUN npm run build
FROM node:24.22.3-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NODE_USE_ENV_PROXY=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
ARG REVISION=unknown
LABEL org.opencontainers.image.revision=$REVISION
USER node
EXPOSE 3000
CMD ["node","server.js"]
