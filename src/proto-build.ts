import * as fs from 'fs';
import { combineProtos } from './combine-protos';
import { generateGrpcClient } from './generate-grpc-client';
import { generateInterfaces } from './generate-interfaces';
import { generateClient } from './generate-client';
import { exec } from 'child_process';

export async function protoBuild(opts: {
  projectDir: string;
  protoDir: string;
  exclude: string[];
  combinedName: string;
  clientDir: string;
}) {
  const combined = combineProtos(
    [`${opts.projectDir}/${opts.protoDir}`],
    opts.exclude,
  );
  fs.writeFileSync(
    `${opts.projectDir}/${opts.protoDir}/${opts.combinedName}.proto`,
    combined,
    'utf-8',
  );

  await generateGrpcClient(
    './node_modules',
    opts.protoDir,
    `${opts.combinedName}.proto`,
    `${opts.combinedName}.grpc.client.ts`,
  );

  const client = fs.readFileSync(
    `${opts.projectDir}/${opts.protoDir}/${opts.combinedName}.grpc.client.ts`,
    'utf-8',
  );
  const interfaces = generateInterfaces(client);
  fs.writeFileSync(
    `${opts.projectDir}/${opts.protoDir}/${opts.combinedName}.interfaces.ts`,
    interfaces,
    'utf-8',
  );

  generateClient(
    `${opts.projectDir}/${opts.protoDir}/${opts.combinedName}.grpc.client.ts`,
    `${opts.projectDir}/${opts.protoDir}/${opts.clientDir}`,
  );

  exec(`cp -r ${__dirname}/google ${opts.projectDir}/${opts.protoDir}`);
}
