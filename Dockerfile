# ============================================================================
# Stage 1: Build the React + Vite frontend
# ============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy application source and configuration
COPY . .

# Build arguments for Vite client-side Firebase config (optional at build time)
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_DATABASE_ID

# Compile frontend bundle into /app/dist
RUN npm run build

# Transpile server.ts to server.js for fast production startup on Cloud Run
RUN npx esbuild server.ts --bundle --platform=node --format=esm --packages=external --outfile=server.js

# ============================================================================
# Stage 2: Production Runtime for Google Cloud Run
# ============================================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy package manifests and install production + runtime dependencies
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Copy compiled frontend dist, static assets, and bundled Express server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/assets ./src/assets
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/server.js ./server.js

EXPOSE 8080

# Run the Express + static dist server
CMD ["node", "server.js"]
