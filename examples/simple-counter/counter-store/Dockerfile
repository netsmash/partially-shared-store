FROM node:12.18.1-alpine
WORKDIR /usr/lib

# Add Partialy Shared Store lib
COPY src /usr/lib/psstore/src
COPY package.json /usr/lib/psstore
COPY README.md /usr/lib/psstore
COPY tsconfig.json /usr/lib/psstore

# Add custom store
COPY examples/simple-counter/counter-store /usr/lib/counter-store

# install and build partially shared store
RUN cd /usr/lib/psstore \
    && npm install \
    && npm run build \
    && cd dist \
    && npm link \
# install and build custom store
    && cd /usr/lib/counter-store \
    && npm install \
    && npm link partially-shared-store \
    && npm run build \
    && cd dist \
    && npm link \
;
