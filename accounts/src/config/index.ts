export const env = {
  rabbitmq: {
    connectionUrl: process.env.RABBITMQ_CONNECTION_URL || "",
  },
  http: {
    serverPort: process.env.HTTP_SERVER_PORT || 3001,
  },
} as const;
