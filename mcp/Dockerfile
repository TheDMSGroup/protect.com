FROM node:20.19.0-slim

RUN corepack enable

RUN apt-get update && apt-get install -y \
  git \
  bash \
  ripgrep \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY mcp/package.json mcp/package-lock.json ./mcp/
RUN cd mcp && npm install

COPY mcp ./mcp

ENV NODE_ENV=development
ENV WATCHPACK_POLLING=true

CMD ["npm", "--prefix", "mcp", "run", "start"]