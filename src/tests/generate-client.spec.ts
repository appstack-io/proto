import { combineProtos } from '../combine-protos';
import * as fs from 'fs';
import { generateClient } from '../generate-client';
import { generateGrpcClient } from '../generate-grpc-client';

describe('generate-client', () => {
  test('basic', async () => {
    const combined = combineProtos([`${__dirname}/protos`], []);
    fs.writeFileSync(`${__dirname}/temp/combined.proto`, combined, 'utf-8');
    await generateGrpcClient(
      `src/tests/temp`,
      `combined.proto`,
      `combined.grpc.ts`,
    );
    generateClient(
      `${__dirname}/temp/combined.grpc.ts`,
      `${__dirname}/temp/client`,
    );
  });
});
