# --- Frontend Dockerfile (React App) ---
    FROM node:18-alpine as build

    WORKDIR /app
    
    COPY package.json package-lock.json /app/
    RUN npm install
    
    COPY . /app/
    RUN npm run build
    
    # Serve with nginx
    FROM nginx:stable-alpine
    COPY --from=build /app/build /usr/share/nginx/html
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    