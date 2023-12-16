import { exec } from 'child_process';
import * as fs from 'fs';

export async function generateGrpcClient(
  nodeModulesDir: string,
  workDir: string,
  sourceProto: string,
  targetTs: string,
) {
  await new Promise<void>((resolve, reject) => {
    exec(
      `${nodeModulesDir}/.bin/grpc_tools_node_protoc --plugin=protoc-gen-ts_proto=node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./${workDir} --ts_proto_opt=outputServices=nice-grpc,outputServices=generic-definitions,useExactTypes=false --proto_path=. ${workDir}/${sourceProto}`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr);
        } else {
          resolve();
        }
      },
    );
  });
  fs.cpSync(
    `${workDir}/${workDir}/${sourceProto.replace('proto', 'ts')}`,
    `${workDir}/${targetTs}`,
  );
  fs.rmSync(`${workDir}/${workDir.split('/')[0]}`, {
    recursive: true,
  });
  const generated = fs.readFileSync(`${workDir}/${targetTs}`, 'utf8');
  const cleaned = generated.replace(/from ".*\/google/g, `from "./google/`);
  fs.writeFileSync(`${workDir}/${targetTs}`, cleaned);
}
