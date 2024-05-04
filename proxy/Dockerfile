FROM node:20-alpine as react_builder
ARG VITE_BACKEND_URL
ARG VITE_APP_NAME
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
WORKDIR /app
COPY ./frontend/package.json .
COPY ./frontend/yarn.lock .
RUN yarn install
COPY ./frontend . 
RUN npm run build


FROM nginx:latest

COPY ./proxy/proxy_params /etc/nginx/
COPY ./proxy/default.conf /etc/nginx/conf.d/default.conf

COPY --from=react_builder /app/dist /dist

CMD ["nginx", "-g", "daemon off;"]