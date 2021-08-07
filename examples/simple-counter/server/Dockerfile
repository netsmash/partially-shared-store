FROM psstore:local AS lib
FROM node:12.18.1-alpine
WORKDIR /srv

# Add libraries
COPY --from=lib /usr/local/lib/node_modules/partially-shared-store /usr/local/lib/node_modules/partially-shared-store
COPY --from=lib /usr/local/lib/node_modules/counter-store /usr/local/lib/node_modules/counter-store

# Add server source
COPY examples/simple-counter/server /srv

RUN cd /srv \
    && npm install \
    && npm link counter-store \
    && npm link partially-shared-store \
    && npm run build \
;

CMD [ "npm", "start" ]
EXPOSE 7001
