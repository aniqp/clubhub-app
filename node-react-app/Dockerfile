FROM node:16-alpine
WORKDIR /
COPY . .
RUN ls
RUN npm install --force --legacy-peer-deps
RUN npm --prefix client install --force --legacy-peer-deps 
RUN yarn install --production
CMD yarn deploy