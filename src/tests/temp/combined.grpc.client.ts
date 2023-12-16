/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "main";

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

function createBaseTest1(): Test1 {
  return { id: "", createdAt: 0, updatedAt: 0, text: "", isPublic: false };
}

export const Test1 = {
  encode(message: Test1, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.createdAt !== 0) {
      writer.uint32(16).uint64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(24).uint64(message.updatedAt);
    }
    if (message.text !== "") {
      writer.uint32(34).string(message.text);
    }
    if (message.isPublic === true) {
      writer.uint32(40).bool(message.isPublic);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Test1 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTest1();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.createdAt = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.updatedAt = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.text = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isPublic = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Test1 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : 0,
      text: isSet(object.text) ? globalThis.String(object.text) : "",
      isPublic: isSet(object.isPublic) ? globalThis.Boolean(object.isPublic) : false,
    };
  },

  toJSON(message: Test1): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      obj.updatedAt = Math.round(message.updatedAt);
    }
    if (message.text !== "") {
      obj.text = message.text;
    }
    if (message.isPublic === true) {
      obj.isPublic = message.isPublic;
    }
    return obj;
  },

  create(base?: DeepPartial<Test1>): Test1 {
    return Test1.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Test1>): Test1 {
    const message = createBaseTest1();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.text = object.text ?? "";
    message.isPublic = object.isPublic ?? false;
    return message;
  },
};

function createBaseTest1CreateOneInput(): Test1CreateOneInput {
  return { text: "" };
}

export const Test1CreateOneInput = {
  encode(message: Test1CreateOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Test1CreateOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTest1CreateOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Test1CreateOneInput {
    return { text: isSet(object.text) ? globalThis.String(object.text) : "" };
  },

  toJSON(message: Test1CreateOneInput): unknown {
    const obj: any = {};
    if (message.text !== "") {
      obj.text = message.text;
    }
    return obj;
  },

  create(base?: DeepPartial<Test1CreateOneInput>): Test1CreateOneInput {
    return Test1CreateOneInput.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Test1CreateOneInput>): Test1CreateOneInput {
    const message = createBaseTest1CreateOneInput();
    message.text = object.text ?? "";
    return message;
  },
};

function createBaseTest2(): Test2 {
  return { id: "", createdAt: 0, updatedAt: 0, text: "", isPublic: false };
}

export const Test2 = {
  encode(message: Test2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.createdAt !== 0) {
      writer.uint32(16).uint64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(24).uint64(message.updatedAt);
    }
    if (message.text !== "") {
      writer.uint32(34).string(message.text);
    }
    if (message.isPublic === true) {
      writer.uint32(40).bool(message.isPublic);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Test2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTest2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.createdAt = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.updatedAt = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.text = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isPublic = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Test2 {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : 0,
      text: isSet(object.text) ? globalThis.String(object.text) : "",
      isPublic: isSet(object.isPublic) ? globalThis.Boolean(object.isPublic) : false,
    };
  },

  toJSON(message: Test2): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      obj.updatedAt = Math.round(message.updatedAt);
    }
    if (message.text !== "") {
      obj.text = message.text;
    }
    if (message.isPublic === true) {
      obj.isPublic = message.isPublic;
    }
    return obj;
  },

  create(base?: DeepPartial<Test2>): Test2 {
    return Test2.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Test2>): Test2 {
    const message = createBaseTest2();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.text = object.text ?? "";
    message.isPublic = object.isPublic ?? false;
    return message;
  },
};

function createBaseTest2CreateOneInput(): Test2CreateOneInput {
  return { text: "" };
}

export const Test2CreateOneInput = {
  encode(message: Test2CreateOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Test2CreateOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTest2CreateOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Test2CreateOneInput {
    return { text: isSet(object.text) ? globalThis.String(object.text) : "" };
  },

  toJSON(message: Test2CreateOneInput): unknown {
    const obj: any = {};
    if (message.text !== "") {
      obj.text = message.text;
    }
    return obj;
  },

  create(base?: DeepPartial<Test2CreateOneInput>): Test2CreateOneInput {
    return Test2CreateOneInput.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Test2CreateOneInput>): Test2CreateOneInput {
    const message = createBaseTest2CreateOneInput();
    message.text = object.text ?? "";
    return message;
  },
};

export type Test1ServiceDefinition = typeof Test1ServiceDefinition;
export const Test1ServiceDefinition = {
  name: "Test1Service",
  fullName: "main.Test1Service",
  methods: {
    createOne: {
      name: "CreateOne",
      requestType: Test1CreateOneInput,
      requestStream: false,
      responseType: Test1,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface Test1ServiceImplementation<CallContextExt = {}> {
  createOne(request: Test1CreateOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Test1>>;
}

export interface Test1ServiceClient<CallOptionsExt = {}> {
  createOne(request: DeepPartial<Test1CreateOneInput>, options?: CallOptions & CallOptionsExt): Promise<Test1>;
}

export type Test2ServiceDefinition = typeof Test2ServiceDefinition;
export const Test2ServiceDefinition = {
  name: "Test2Service",
  fullName: "main.Test2Service",
  methods: {
    createOne: {
      name: "CreateOne",
      requestType: Test2CreateOneInput,
      requestStream: false,
      responseType: Test2,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface Test2ServiceImplementation<CallContextExt = {}> {
  createOne(request: Test2CreateOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Test2>>;
}

export interface Test2ServiceClient<CallOptionsExt = {}> {
  createOne(request: DeepPartial<Test2CreateOneInput>, options?: CallOptions & CallOptionsExt): Promise<Test2>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
