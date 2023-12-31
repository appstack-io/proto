import { Empty } from './google/protobuf/empty';

import { Observable } from 'rxjs';

import type { CallContext, CallOptions } from "nice-grpc-common";

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
      : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
      : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
      : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
      : Partial<T>;
    

export interface Test1 {
  id: string;
  createdAt: number;
  updatedAt: number;
  text: string;
  isPublic: boolean;
}

export interface Test1CreateOneInput {
  text: string;
}

export interface Test2 {
  id: string;
  createdAt: number;
  updatedAt: number;
  text: string;
  isPublic: boolean;
}

export interface Test2CreateOneInput {
  text: string;
}

export interface Test1ServiceImplementation<CallContextExt = {}> {
  createOne(request: Test1CreateOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Test1>>;
}

export interface Test1ServiceClient<CallOptionsExt = {}> {
  createOne(request: DeepPartial<Test1CreateOneInput>, options?: CallOptions & CallOptionsExt): Promise<Test1>;
}

export interface Test2ServiceImplementation<CallContextExt = {}> {
  createOne(request: Test2CreateOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Test2>>;
}

export interface Test2ServiceClient<CallOptionsExt = {}> {
  createOne(request: DeepPartial<Test2CreateOneInput>, options?: CallOptions & CallOptionsExt): Promise<Test2>;
}