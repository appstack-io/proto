import { combineProtos } from '../combine-protos';
import { generateInterfaces } from '../generate-interfaces';
import * as fs from 'fs';
import { generateGrpcClient } from '../generate-grpc-client';

describe('generate-interfaces', () => {
  test('basic', async () => {
    combineProtos([`${__dirname}/protos`], []);
    await generateGrpcClient(
      `./node_modules`,
      `src/tests/temp`,
      `combined.proto`,
      `combined.grpc.client.ts`,
    );
    const client = fs.readFileSync(
      `${__dirname}/temp/combined.grpc.client.ts`,
      'utf-8',
    );
    const interfaces = generateInterfaces(client);
    expect(interfaces).toMatchSnapshot();
  });
});
