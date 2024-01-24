# Use an official Node runtime as a parent image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (if exists)
COPY package.json yarn.lock* ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Your client application might be using a different port
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Command to run your app
CMD ["yarn", "start"]
