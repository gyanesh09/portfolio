FROM node:20 AS build

WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@15.0.0

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular app
RUN ng build --configuration=production

# Use NGINX base image for serving Angular application
FROM nginx:alpine

# Copy the built Angular app from the build stage to the NGINX web root directory
COPY --from=build /app/dist/portfolio/browser/* /usr/share/nginx/html/
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
