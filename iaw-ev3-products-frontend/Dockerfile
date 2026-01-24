# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve
FROM nginx:alpine

# Copy the build output to the Nginx html directory
# For Angular 17+ with @angular/build:application, the output is in dist/<project-name>/browser
COPY --from=build /app/dist/iaw-ev3-products-frontend/browser /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
