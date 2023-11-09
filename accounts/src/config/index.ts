export const env = {
  rabbitmq: {
    connectionUrl: process.env.RABBITMQ_CONNECTION_URL || "",
  },
} as const;
