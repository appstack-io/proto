import { combineProtos } from '../combine-protos';
import * as fs from 'fs';
import { generateGrpcClient } from '../generate-grpc-client';

describe('generate-grpc-client', () => {
  test('basic', async () => {
    const combined = combineProtos([`${__dirname}/protos`], []);
    fs.writeFileSync(`${__dirname}/temp/combined.proto`, combined, 'utf-8');
    await generateGrpcClient(
      `src/tests/temp`,
      `combined.proto`,
      `combined.grpc.ts`,
    );
  });
});
