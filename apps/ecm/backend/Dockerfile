# Step 1: Use the Bun image to build the backend
FROM oven/bun:latest AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or package*.json) to the container
COPY package*.json ./

# Install the backend dependencies using Bun
RUN bun install --production

# Step 2: Copy the rest of the backend files
COPY . .

# Expose the backend port (5001 instead of 5000)
EXPOSE 5001

# Step 3: Run the backend with Bun
# If your app listens on port 5001, ensure it's set in the environment or change the app configuration
CMD ["bun", "run", "start", "--port", "5001"]
