import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const PostServiceClientOptions: ClientProviderOptions = {
  name: process.env.POST_SERVICE_NAME,
  transport: Transport.RMQ,
  options: {
    urls: [
      `${process.env.RMQ_PREFIX}${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`,
    ],
    queue: process.env.POST_SERVICE_NAME,
    queueOptions: {
      durable: false,
    },
  },
};
