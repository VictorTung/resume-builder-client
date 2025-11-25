# --- build stage ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Set any Vite env vars here, e.g.:
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL

RUN npm run build 

# --- runtime stage ---
FROM nginx:1.25-alpine AS runtime

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
