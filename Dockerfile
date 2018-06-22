FROM node:6

# creates the folder structure
RUN mkdir -p /usr/local/prj/fifa/

# set our node environment, either development or testing or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# default to port 3001 for node, and 5858 or 9229 for debug
ARG PORT=4200
ENV PORT $PORT
EXPOSE $PORT 

# install dependencies first and in a different location for easier app bind mounting for local development
WORKDIR /usr/local/prj/
COPY package.json .
RUN npm install && npm cache clean --force
ENV PATH /usr/local/prj/node_modules/.bin:$PATH

# copy source code
WORKDIR /usr/local/prj/fifa
COPY . /usr/local/prj/fifa

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly.
CMD [ "npm", "start" ]

