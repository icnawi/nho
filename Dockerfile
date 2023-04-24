# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json, pnpm-lock.yaml and .npmrc (if it exists) to the working directory
COPY package*.json pnpm-lock.yaml* .npmrc* ./

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy the rest of the application code to the working directory
COPY . .

# Compile TypeScript code
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "node", "--experimental-specifier-resolution=node", "dist/index.js" ]