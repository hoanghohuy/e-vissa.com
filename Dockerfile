# Use an official Node.js runtime as a parent image for the build stage
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /e-vissa

# Copy package.json and package-lock.json to the container
COPY e-vissa/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY e-vissa/ ./

# Build the application
RUN npm run build

# Use a new stage for the runtime image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /e-vissa

# Copy built files from the build stage to the runtime image
COPY --from=build /e-vissa .

# Command to run the application
CMD ["npm", "start"]
