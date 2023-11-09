import amqp from "amqplib";

import { MessageProvider } from "../../application/providers/message-provider";
import { env } from "../../config";

export class RabbitmqMessageProviderAdapter implements MessageProvider {
  private connection!: amqp.Connection;

  public async sendMessage(message: string, data: Buffer) {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(message, { durable: true });
    channel.sendToQueue(message, data);
    await channel.close();
  }

  public async connect() {
    this.connection = await amqp.connect(env.rabbitmq.connectionUrl);
  }

  public async onMessage<T>(
    message: string,
    callback: (data: T) => Promise<void>
  ) {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(message, { durable: true });
    channel.consume(message, async (msg) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString()) as T;
        await callback(data);

        channel.ack(msg);
      }
    });
  }
}
