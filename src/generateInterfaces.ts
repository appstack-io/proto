import * as fs from 'fs';

export function generateInterfaces(source: string, target: string) {
  const protoFilePath = source;
  const fileContents: string = fs.readFileSync(protoFilePath, 'utf-8');
  const interfaceRegex = /export (interface|enum) [\s\S]*?\}(?=\n|$)/gm;
  const imports: string[] = [
    "import { Empty } from './google/protobuf/empty';",
    "import { Observable } from 'rxjs';",
  ];
  const interfaces: string[] | null = fileContents.match(interfaceRegex);
  if (interfaces) {
    fs.writeFileSync(target, [...imports, ...interfaces].join('\n\n'));
  } else {
    console.error('No interfaces or enums found in the file.');
  }
}
