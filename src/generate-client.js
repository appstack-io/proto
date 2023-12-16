const fs = require('fs');
const fsPath = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generator = require('@babel/generator').default;
const { exec } = require('child_process');

export function generateClient(sourceTs, targetDir) {
  // Ensure the output directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Read the source file containing the service definitions and type interfaces
  const code = fs.readFileSync(sourceTs, 'utf-8');

  // Parse the code into an AST (Abstract Syntax Tree)
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  // Function to generate service interfaces
  const generateInterfaces = (types, ast) => {
    let interfaces = {};
    let processedTypes = new Set();

    const extractNestedInterfaces = (typeName) => {
      if (processedTypes.has(typeName)) {
        return; // Prevent infinite loops and duplicate processing
      }
      processedTypes.add(typeName);

      // Find the interface declaration in the AST
      traverse(ast, {
        TSInterfaceDeclaration(path) {
          if (path.node.id.name === typeName) {
            const result = generator(path.node).code;
            interfaces[typeName] = `export ${result}`;

            // Now look for nested types within the current interface
            path.traverse({
              enter(path) {
                if (path.node.typeName && t.isIdentifier(path.node.typeName)) {
                  const nestedTypeName = path.node.typeName.name;
                  if (!processedTypes.has(nestedTypeName)) {
                    extractNestedInterfaces(nestedTypeName);
                  }
                }
              },
            });
          }
        },
      });
    };

    // Initialize the process for each type in the methods
    types.forEach((type) => extractNestedInterfaces(type));

    return Object.values(interfaces).join('\n\n');
  };

  // Generate the utility file (utils.ts)
  const utilsContent = `import * as clientLib from './${fsPath
    .basename(sourceTs)
    .replace('.ts', '')}';
import { createChannel, createClient, Metadata } from 'nice-grpc';

export async function postToUnary<T>(
  serviceName: string,
  methodName: string,
  data: any,
  metadata: Metadata,
  opts?: {port?: string, host?: string}
): Promise<T> {
  const definition = clientLib[\`\${serviceName}Definition\`];
  const host = serviceName.toLowerCase().replace('service', '');
  const channel = createChannel(\`\${opts?.host || host}:\${opts?.port || process.env.ASIO_MS_PORT}\`);
  const client = createClient(definition, channel);
  const result = await client[methodName](data, { metadata });
  return result;
}
`;

  fs.writeFileSync(`${targetDir}/utils.ts`, utilsContent);

  // Keep track of all the service names
  let serviceNames = [];

  // Helper function to generate the TypeScript class
  const generateServiceClass = (serviceName, methods, types) => {
    const methodStrings = methods.map(
      (method) => `
    async ${method.name}(data: Partial<${method.requestType}>, metadata: Metadata=new Metadata()): Promise<${method.responseType}> {
      return postToUnary<${method.responseType}>(this.serviceName, '${method.name}', data, metadata, this.opts);
    }
  `,
    );

    const interfaceDefinitions = generateInterfaces(types, ast);

    let result = `
  ${interfaceDefinitions}
  import { postToUnary } from './utils';
  import { Metadata } from 'nice-grpc';
 
  export class ${serviceName} {
    private readonly serviceName: string = "${serviceName}";
    
    constructor(private opts?: {port?: string, host?: string}){}
    
    ${methodStrings.join('')}
  }
`;
    if (result.indexOf('Empty') > -1) {
      result = `import { Empty } from './google/protobuf/empty';\n${result}`;
    }
    return result;
  };

  // Traverse the AST to find the service definitions and generate the corresponding classes
  traverse(ast, {
    enter(path) {
      if (!path.node.declarations) return;
      const declaration = path.node.declarations[0];
      if (!declaration.id.name.endsWith('Definition')) return;
      const serviceName = declaration.id.name.replace('Definition', '');
      serviceNames.push(serviceName); // Add to service names list
      const properties = declaration.init.expression?.properties;
      if (!properties) return;
      const serviceMethods = properties.find(
        (p) => t.isObjectProperty(p) && p.key.name === 'methods',
      );
      const methods = serviceMethods?.value.properties.map((method) => ({
        name: method.key.name,
        requestType: method.value.properties.find(
          (p) => p.key.name === 'requestType',
        ).value.name,
        responseType: method.value.properties.find(
          (p) => p.key.name === 'responseType',
        ).value.name,
      }));

      const types = methods.flatMap((method) => [
        method.requestType,
        method.responseType,
      ]);

      const classContent = generateServiceClass(serviceName, methods, types);
      fs.writeFileSync(`${targetDir}/${serviceName}.ts`, classContent);
    },
  });

  exec(`cp -r ${fsPath.dirname(sourceTs)}/google ${targetDir}`);
  exec(`cp ${sourceTs} ${targetDir}`);

  // Generate the index file
  const indexContent = [...serviceNames, `google/protobuf/empty`]
    .map((ex) => `export * from './${ex}';`)
    .concat(`export { Metadata } from 'nice-grpc';`)
    .join('\n');
  fs.writeFileSync(`${targetDir}/index.ts`, indexContent);
}
