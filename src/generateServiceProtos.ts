import * as fs from 'fs';
import { combineProtos } from './combineProtos';

export async function generateServiceProtos(dir: string) {
  const moduleFiles = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => `${dir}/${file}`);
  for (const file of moduleFiles) {
    const clss = await import(file);
    const imports = clss['imports'] ? clss.imports : null;
    if (!imports) continue;
    const sourceDirs = imports
      .map((imp) => (imp['getDirname'] ? imp['getDirname']() : null))
      .filter((i) => i);
    combineProtos(sourceDirs, `${file}.proto`);
  }
}
