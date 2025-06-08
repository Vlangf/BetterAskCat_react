# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built application from build stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Start serve
CMD ["serve", "-s", ".", "-l", "80"]
