import * as fs from 'fs';
import * as path from 'path';
import { consolidateProtos } from './consolidateProtos';

const findProtoFiles = (dir: string, fileList: string[] = []): string[] => {
  const files: string[] = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath: string = path.join(dir, file);
    const stat: fs.Stats = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findProtoFiles(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      fileList.push(filePath);
    }
  });

  return fileList.filter((file) => !file.includes('/tests/'));
};

export function combineProtos(sources: string[], target: string) {
  const protoFiles: string[] = sources.reduce((acc, val) => {
    acc.push(...findProtoFiles(val));
    return acc;
  }, []);

  let combinedContent = '';
  const importStatements: Set<string> = new Set();

  // Loop through all files
  protoFiles.forEach((file) => {
    const content: string = fs.readFileSync(file, 'utf8');

    // Extract unique import statements
    content.split('\n').forEach((line) => {
      if (line.startsWith('import ')) {
        importStatements.add(line);
      }
    });

    // Exclude lines with 'syntax = "proto3";', 'import ...', or starting with 'package'
    const filteredContent: string = content
      .split('\n')
      .filter(
        (line) =>
          !line.includes('syntax = "proto3";') &&
          !line.startsWith('import ') &&
          !line.startsWith('package '),
      )
      .join('\n');

    combinedContent += filteredContent + '\n';
  });

  // Consolidate the combined content
  const consolidated: string = consolidateProtos(combinedContent);

  // Prepend 'syntax = "proto3";' and the unique import statements to the consolidated content
  const finalContent: string =
    'syntax = "proto3";\n' +
    Array.from(importStatements).join('\n') +
    '\npackage main;\n\n' +
    consolidated;

  // Write the final content to a file
  fs.writeFileSync(target, finalContent, 'utf-8');
}
