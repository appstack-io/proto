import * as fs from 'fs';

export function generateHostMappings(sourceDir: string) {
  const mappings: Record<string, string> = {};
  const dirs = fs.readdirSync(sourceDir);
  for (const dir of dirs) {
    const protos = fs.readdirSync(`${sourceDir}/${dir}`);
    for (const proto of protos) {
      const data = fs.readFileSync(`${sourceDir}/${dir}/${proto}`, 'utf-8');
      const services = extractServiceNames(data);
      for (const service of services) {
        const short = service.toLowerCase().replace('service', '');
        mappings[short] = dir;
      }
    }
  }
  return mappings;
}

function extractServiceNames(protoDef: string): string[] {
  const serviceRegex: RegExp = /service\s+(\w+)\s*{/g;
  const serviceNames: string[] = [];
  let match: RegExpExecArray | null;

  // Iterate over all matches of the regular expression
  while ((match = serviceRegex.exec(protoDef)) !== null) {
    // Add the captured service name to the array
    serviceNames.push(match[1]);
  }

  return serviceNames;
}
