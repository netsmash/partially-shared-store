FROM psstore:local AS lib
FROM node:12.18.1-alpine as build
WORKDIR /usr/app

ARG WS_ENDPOINT=ws://localhost:7001

# Add libraries
COPY --from=lib /usr/local/lib/node_modules/partially-shared-store /usr/local/lib/node_modules/partially-shared-store
COPY --from=lib /usr/local/lib/node_modules/counter-store /usr/local/lib/node_modules/counter-store

# Add server source
COPY examples/simple-counter/client /usr/app

RUN cd /usr/app \
    && npm install \
    && npm link counter-store \
    && npm link partially-shared-store \
    && npm run build \
;


FROM nginx:1.16.0-alpine

COPY --from=build /usr/app/dist /usr/share/nginx/html

EXPOSE 80
