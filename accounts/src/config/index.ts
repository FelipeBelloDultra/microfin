export const env = {
  rabbitmq: {
    connectionUrl: process.env.RABBITMQ_CONNECTION_URL || "",
  },
  http: {
    serverPort: process.env.HTTP_SERVER_PORT || "3000",
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || "",
  },
} as const;
