export function generateInterfaces(source: string) {
  const interfaceRegex = /export (interface|enum) [\s\S]*?\}(?=\n|$)/gm;
  const imports: string[] = [
    `import { Empty } from './google/protobuf/empty';`,
    `import { Observable } from 'rxjs';`,
    `import type { CallContext, CallOptions, CallOptionsExt } from "nice-grpc-common";`,
    `type DeepPartial<T> = T extends Builtin ? T
      : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
      : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
      : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
      : Partial<T>;
    `,
  ];
  const interfaces: string[] | null = source.match(interfaceRegex);
  return [...imports, ...(interfaces || [])].join('\n\n');
}
