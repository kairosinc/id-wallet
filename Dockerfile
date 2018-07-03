FROM node:8.11.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --only=production

# Bundle app source
COPY . .

# create production build
RUN yarn build

EXPOSE 8000
CMD [ "yarn", "start" ]