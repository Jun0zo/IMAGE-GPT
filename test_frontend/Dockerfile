# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the environment variable to specify the API URL
ENV REACT_APP_API_URL=http://fastapi:8000

# Build the application
RUN npm run build

# Expose the port that the app will listen on
EXPOSE 3000

# Serve the application using serve

CMD ["npm", "run", "serve"]
