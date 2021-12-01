FROM node:14.17.1 as base

ENV DB_DEV_CONNECTION_STRING='postgres://root:password@postgres:5432/postgresdev'
ENV DB_TEST_CONNECTION_STRING='postgres://root:password@postgres:5432/postgrestest'
ENV DB_PROD_CONNECTION_STRING='postgres://root:password@postgres:5432/postgresprod'
ENV AUTH_SECRET='asdasdasd4554asd546as5dd56456a645dsa'
ENV ACCESS_TOKEN_SECRET='asdasdasdasdasdasdasdasdasd'
ENV REFRESH_TOKEN_SECRET='zzz4456asdas56d46asd4s6a5asd'
ENV NODE_ENV='dev'

# Add package file
COPY package*.json ./

# Install deps
RUN npm i

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN npm run build

# Start production image build
FROM gcr.io/distroless/nodejs:14

ENV DB_DEV_CONNECTION_STRING='postgres://root:password@postgres:5432/postgresdev'
ENV DB_TEST_CONNECTION_STRING='postgres://root:password@postgres:5432/postgrestest'
ENV DB_PROD_CONNECTION_STRING='postgres://root:password@postgres:5432/postgresprod'
ENV AUTH_SECRET='asdasdasd4554asd546as5dd56456a645dsa'
ENV ACCESS_TOKEN_SECRET='asdasdasdasdasdasdasdasdasd'
ENV REFRESH_TOKEN_SECRET='zzz4456asdas56d46asd4s6a5asd'
ENV NODE_ENV='dev'

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /build /build

# Expose port 3000
EXPOSE 3000
CMD ["build/server.js"]