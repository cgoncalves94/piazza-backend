FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Accept build arguments 
ARG DB_CONNECTOR
ARG TOKEN_SECRET

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "app.js"]
