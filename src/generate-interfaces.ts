export function generateInterfaces(source: string) {
  const interfaceRegex = /export (interface|enum) [\s\S]*?\}(?=\n|$)/gm;
  const imports: string[] = [
    "import { Empty } from './google/protobuf/empty';",
    "import { Observable } from 'rxjs';",
  ];
  const interfaces: string[] | null = source.match(interfaceRegex);
  return [...imports, ...(interfaces || [])].join('\n\n');
}
