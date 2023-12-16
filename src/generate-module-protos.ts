import * as fs from 'fs';
import { combineProtos } from './combine-protos';

export async function generateModuleProtos(dir: string, exclude: string[]) {
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
    const combined = combineProtos(sourceDirs, exclude);
    fs.writeFileSync(`${file}.proto`, combined, 'utf-8');
  }
}
