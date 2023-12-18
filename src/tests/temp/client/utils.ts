import * as clientLib from './combined.grpc.client';
import { createChannel, createClient, Metadata } from 'nice-grpc';
const hostMappings={};

export async function postToUnary<T>(
  serviceName: string,
  methodName: string,
  data: any,
  metadata: Metadata,
  opts?: {port?: string, host?: string}
): Promise<T> {
  const definition = clientLib[`${serviceName}Definition`];
  const service = serviceName.toLowerCase().replace('service', '');
  const host = hostMappings[service] || service;
  const channel = createChannel(`${opts?.host || host}:${opts?.port || process.env.ASIO_MS_PORT}`);
  const client = createClient(definition, channel);
  const result = await client[methodName](data, { metadata });
  return result;
}
